import cron from 'node-cron';
import { logger } from '../config/logger.js';
import { query } from '../config/database.js';
import { getCurrentWeather, determineAlertSeverity } from '../services/weatherDataService.js';
import { checkAndGenerateAlerts, broadcastAreaAlert } from '../services/alertGeneratorService.js';

// Alert monitoring job - checks for severe weather conditions
export function startAlertMonitoringJob(): void {
    // Run every minute for active orders
    cron.schedule('* * * * *', async () => {
        try {
            // Get active orders that need monitoring
            const result = await query(`
        SELECT o.id, o.customer_id, o.provider_id, 
               o.destination_lat, o.destination_lon, o.destination_name
        FROM orders o
        WHERE o.status IN ('accepted', 'in_progress')
          AND o.destination_lat IS NOT NULL
        LIMIT 50
      `);

            for (const order of result.rows) {
                try {
                    const lat = parseFloat(order.destination_lat);
                    const lon = parseFloat(order.destination_lon);

                    // Check weather and generate alerts for customer
                    if (order.customer_id) {
                        await checkAndGenerateAlerts(
                            order.customer_id,
                            lat,
                            lon,
                            order.destination_name
                        );
                    }

                    // Also alert provider if assigned
                    if (order.provider_id) {
                        await checkAndGenerateAlerts(
                            order.provider_id,
                            lat,
                            lon,
                            order.destination_name
                        );
                    }
                } catch (error) {
                    logger.error('Error monitoring order weather', {
                        orderId: order.id,
                        error
                    });
                }
            }
        } catch (error) {
            logger.error('Alert monitoring job failed:', error);
        }
    });

    // Run severe weather check every 30 seconds
    cron.schedule('*/30 * * * * *', async () => {
        try {
            // Check for Level 4 (Emergency) conditions at monitored locations
            const result = await query(`
        SELECT DISTINCT 
          ROUND(CAST(destination_lat AS NUMERIC), 2) as lat, 
          ROUND(CAST(destination_lon AS NUMERIC), 2) as lon
        FROM orders
        WHERE status IN ('accepted', 'in_progress')
          AND destination_lat IS NOT NULL
        LIMIT 20
      `);

            for (const loc of result.rows) {
                try {
                    const lat = parseFloat(loc.lat);
                    const lon = parseFloat(loc.lon);
                    const weather = await getCurrentWeather(lat, lon);
                    const severity = determineAlertSeverity(weather);

                    // Broadcast emergency alerts immediately
                    if (severity === 4) {
                        await broadcastAreaAlert(
                            lat,
                            lon,
                            10, // 10km radius
                            4,
                            '🚨 EMERGENCY: Severe Weather',
                            `Dangerous ${weather.condition} conditions detected. Seek shelter immediately.`
                        );
                    }
                } catch (error) {
                    logger.error('Error checking severe weather', { loc, error });
                }
            }
        } catch (error) {
            logger.error('Severe weather check failed:', error);
        }
    });

    // Cleanup old alerts (run daily at 3 AM)
    cron.schedule('0 3 * * *', async () => {
        try {
            const result = await query(`
        DELETE FROM weather_alerts
        WHERE created_at < NOW() - INTERVAL '30 days'
          AND (acknowledged_at IS NOT NULL OR severity < 3)
        RETURNING id
      `);

            logger.info(`Cleaned up ${result.rowCount} old alerts`);
        } catch (error) {
            logger.error('Alert cleanup failed:', error);
        }
    });

    logger.info('Alert monitoring job scheduled');
}
