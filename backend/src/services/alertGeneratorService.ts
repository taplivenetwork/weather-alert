import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';
import { logger } from '../config/logger.js';
import { getCurrentWeather, determineAlertSeverity } from './weatherDataService.js';
import { broadcastAlert, notifyUser } from './socketService.js';
import type {
    WeatherAlert,
    CreateAlertInput,
    CurrentWeather,
    AlertSeverity,
    WeatherType
} from '../models/types.js';

// Alert severity configurations
const SEVERITY_CONFIG: Record<AlertSeverity, {
    title: string;
    recommendation: string;
    channels: ('push' | 'sms' | 'email')[];
}> = {
    1: {
        title: '🌤️ Weather Update',
        recommendation: 'Consider preparing backup plans.',
        channels: ['push']
    },
    2: {
        title: '⚠️ Weather Advisory',
        recommendation: 'Take precautions and monitor conditions.',
        channels: ['push', 'email']
    },
    3: {
        title: '⚠️ Weather Warning',
        recommendation: 'Strongly consider postponing outdoor activities.',
        channels: ['push', 'sms', 'email']
    },
    4: {
        title: '🚨 EMERGENCY ALERT',
        recommendation: 'Seek shelter immediately!',
        channels: ['push', 'sms', 'email']
    }
};

// Map weather condition to type
function mapConditionToType(condition: string): WeatherType {
    const conditionMap: Record<string, WeatherType> = {
        'clear': 'clear',
        'clouds': 'clouds',
        'rain': 'rain',
        'drizzle': 'rain',
        'snow': 'snow',
        'thunderstorm': 'thunderstorm',
        'tornado': 'tornado',
        'hurricane': 'hurricane',
        'mist': 'other',
        'fog': 'other',
        'haze': 'other'
    };
    return conditionMap[condition.toLowerCase()] || 'other';
}

// Generate alert description based on weather
function generateAlertDescription(weather: CurrentWeather, severity: AlertSeverity): string {
    const descriptions: string[] = [];

    descriptions.push(`Current conditions: ${weather.description}`);
    descriptions.push(`Temperature: ${weather.temperature}°F (feels like ${weather.feelsLike}°F)`);

    if (weather.windSpeed > 15) {
        descriptions.push(`Wind: ${weather.windSpeed} mph`);
    }

    if (weather.visibility < 5) {
        descriptions.push(`Visibility: ${weather.visibility.toFixed(1)} miles`);
    }

    if (severity >= 3) {
        descriptions.push('Conditions may be hazardous for outdoor activities.');
    }

    return descriptions.join('. ');
}

// Create a new weather alert
export async function createAlert(input: CreateAlertInput): Promise<WeatherAlert> {
    const id = uuidv4();
    const config = SEVERITY_CONFIG[input.severity];
    const now = new Date();

    const result = await query(
        `INSERT INTO weather_alerts 
     (id, user_id, order_id, latitude, longitude, place_name, severity, weather_type, 
      title, description, recommendation, valid_from, valid_until, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
     RETURNING *`,
        [
            id,
            input.userId,
            input.orderId || null,
            input.latitude,
            input.longitude,
            input.placeName || null,
            input.severity,
            input.weatherType,
            input.title || config.title,
            input.description,
            input.recommendation || config.recommendation,
            input.validFrom || now,
            input.validUntil || new Date(now.getTime() + 3600000), // 1 hour default
            now
        ]
    );

    const alert: WeatherAlert = {
        id: result.rows[0].id,
        userId: result.rows[0].user_id,
        orderId: result.rows[0].order_id,
        location: {
            latitude: result.rows[0].latitude,
            longitude: result.rows[0].longitude,
            placeName: result.rows[0].place_name
        },
        severity: result.rows[0].severity,
        weatherType: result.rows[0].weather_type,
        title: result.rows[0].title,
        description: result.rows[0].description,
        recommendation: result.rows[0].recommendation,
        validFrom: result.rows[0].valid_from,
        validUntil: result.rows[0].valid_until,
        createdAt: result.rows[0].created_at
    };

    logger.info('Created weather alert', {
        alertId: id,
        userId: input.userId,
        severity: input.severity
    });

    // Send notification via WebSocket
    notifyUser(input.userId, 'weather_alert', alert);

    return alert;
}

// Check weather and generate alerts if needed for a location
export async function checkAndGenerateAlerts(
    userId: string,
    lat: number,
    lon: number,
    placeName?: string
): Promise<WeatherAlert | null> {
    try {
        const weather = await getCurrentWeather(lat, lon);
        const severity = determineAlertSeverity(weather);

        if (severity === null) {
            return null; // No alert needed
        }

        const weatherType = mapConditionToType(weather.condition);
        const description = generateAlertDescription(weather, severity);

        const alert = await createAlert({
            userId,
            latitude: lat,
            longitude: lon,
            placeName,
            severity,
            weatherType,
            title: SEVERITY_CONFIG[severity].title,
            description,
            recommendation: SEVERITY_CONFIG[severity].recommendation
        });

        return alert;
    } catch (error) {
        logger.error('Error checking/generating alerts:', error);
        throw error;
    }
}

// Get alerts for a user
export async function getUserAlerts(
    userId: string,
    options: { limit?: number; offset?: number; acknowledged?: boolean } = {}
): Promise<WeatherAlert[]> {
    const { limit = 50, offset = 0, acknowledged } = options;

    let whereClause = 'WHERE user_id = $1';
    const params: any[] = [userId];

    if (acknowledged !== undefined) {
        whereClause += acknowledged
            ? ' AND acknowledged_at IS NOT NULL'
            : ' AND acknowledged_at IS NULL';
    }

    const result = await query(
        `SELECT * FROM weather_alerts ${whereClause}
     ORDER BY created_at DESC
     LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
        [...params, limit, offset]
    );

    return result.rows.map(row => ({
        id: row.id,
        userId: row.user_id,
        orderId: row.order_id,
        location: {
            latitude: parseFloat(row.latitude),
            longitude: parseFloat(row.longitude),
            placeName: row.place_name
        },
        severity: row.severity,
        weatherType: row.weather_type,
        title: row.title,
        description: row.description,
        recommendation: row.recommendation,
        validFrom: row.valid_from,
        validUntil: row.valid_until,
        deliveredAt: row.delivered_at,
        acknowledgedAt: row.acknowledged_at,
        feedbackRating: row.feedback_rating,
        feedbackText: row.feedback_text,
        createdAt: row.created_at
    }));
}

// Acknowledge an alert
export async function acknowledgeAlert(alertId: string, userId: string): Promise<boolean> {
    const result = await query(
        `UPDATE weather_alerts 
     SET acknowledged_at = NOW()
     WHERE id = $1 AND user_id = $2 AND acknowledged_at IS NULL
     RETURNING id`,
        [alertId, userId]
    );

    if (result.rowCount && result.rowCount > 0) {
        logger.info('Alert acknowledged', { alertId, userId });
        return true;
    }
    return false;
}

// Submit feedback for an alert
export async function submitAlertFeedback(
    alertId: string,
    userId: string,
    rating: number,
    text?: string
): Promise<boolean> {
    const result = await query(
        `UPDATE weather_alerts 
     SET feedback_rating = $3, feedback_text = $4
     WHERE id = $1 AND user_id = $2
     RETURNING id`,
        [alertId, userId, rating, text || null]
    );

    if (result.rowCount && result.rowCount > 0) {
        logger.info('Alert feedback submitted', { alertId, userId, rating });
        return true;
    }
    return false;
}

// Broadcast alert to all users in an area
export async function broadcastAreaAlert(
    lat: number,
    lon: number,
    radiusKm: number,
    severity: AlertSeverity,
    title: string,
    description: string
): Promise<number> {
    // In production, this would query users by location
    // For now, broadcast to all connected clients
    const alert: Partial<WeatherAlert> = {
        id: uuidv4(),
        location: { latitude: lat, longitude: lon },
        severity,
        weatherType: 'other',
        title,
        description,
        recommendation: SEVERITY_CONFIG[severity].recommendation,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 3600000),
        createdAt: new Date()
    };

    broadcastAlert(alert as WeatherAlert);
    logger.info('Broadcast area alert', { lat, lon, radiusKm, severity });

    return 1; // Would return count of notified users
}
