import cron from 'node-cron';
import { logger } from '../config/logger.js';
import { query } from '../config/database.js';
import { getFullWeatherData } from '../services/weatherDataService.js';

// Polling job - refreshes weather data for active locations
export function startWeatherPollingJob(): void {
    // Run every 5 minutes
    cron.schedule('*/5 * * * *', async () => {
        logger.info('Running weather polling job');

        try {
            // Get unique locations from active orders and recent alerts
            const result = await query(`
        SELECT DISTINCT 
          ROUND(CAST(destination_lat AS NUMERIC), 2) as lat, 
          ROUND(CAST(destination_lon AS NUMERIC), 2) as lon
        FROM orders
        WHERE status IN ('pending', 'accepted', 'in_progress')
          AND destination_lat IS NOT NULL
        UNION
        SELECT DISTINCT 
          ROUND(CAST(latitude AS NUMERIC), 2) as lat, 
          ROUND(CAST(longitude AS NUMERIC), 2) as lon
        FROM weather_alerts
        WHERE created_at > NOW() - INTERVAL '1 hour'
        LIMIT 100
      `);

            const locations = result.rows;
            logger.info(`Polling weather for ${locations.length} locations`);

            // Fetch weather for each location (with rate limiting)
            for (const loc of locations) {
                try {
                    await getFullWeatherData(parseFloat(loc.lat), parseFloat(loc.lon));
                    // Small delay to avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, 200));
                } catch (error) {
                    logger.error('Error fetching weather for location', {
                        lat: loc.lat,
                        lon: loc.lon,
                        error
                    });
                }
            }

            logger.info('Weather polling job completed');
        } catch (error) {
            logger.error('Weather polling job failed:', error);
        }
    });

    logger.info('Weather polling job scheduled (every 5 minutes)');
}
