import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { getCurrentWeather, getWeatherForecast, getFullWeatherData, calculateWeatherScore } from '../services/weatherDataService.js';
import { logger } from '../config/logger.js';

const router = Router();

// Validation schemas
const coordsSchema = z.object({
    lat: z.string().transform(val => parseFloat(val)).refine(val => !isNaN(val) && val >= -90 && val <= 90, 'Invalid latitude'),
    lon: z.string().transform(val => parseFloat(val)).refine(val => !isNaN(val) && val >= -180 && val <= 180, 'Invalid longitude')
});

const forecastSchema = coordsSchema.extend({
    hours: z.string().optional().transform(val => val ? parseInt(val) : 48).refine(val => val > 0 && val <= 168, 'Hours must be between 1 and 168')
});

// GET /api/v1/weather/current - Get current weather
router.get('/current', async (req: Request, res: Response) => {
    try {
        const { lat, lon } = coordsSchema.parse(req.query);

        const weather = await getCurrentWeather(lat, lon);
        const score = calculateWeatherScore(weather);

        res.json({
            success: true,
            data: {
                ...weather,
                weatherScore: score,
                location: { latitude: lat, longitude: lon }
            }
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                error: 'Invalid parameters',
                details: error.errors
            });
        }
        logger.error('Error fetching current weather:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch weather data' });
    }
});

// GET /api/v1/weather/forecast - Get weather forecast
router.get('/forecast', async (req: Request, res: Response) => {
    try {
        const { lat, lon, hours } = forecastSchema.parse(req.query);

        const forecast = await getWeatherForecast(lat, lon, hours);

        res.json({
            success: true,
            data: {
                location: { latitude: lat, longitude: lon },
                hourly: forecast.hourly,
                daily: forecast.daily
            }
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                error: 'Invalid parameters',
                details: error.errors
            });
        }
        logger.error('Error fetching forecast:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch forecast data' });
    }
});

// GET /api/v1/weather/full - Get full weather data (current + forecast)
router.get('/full', async (req: Request, res: Response) => {
    try {
        const { lat, lon } = coordsSchema.parse(req.query);

        const weatherData = await getFullWeatherData(lat, lon);
        const score = calculateWeatherScore(weatherData.current);

        res.json({
            success: true,
            data: {
                ...weatherData,
                weatherScore: score
            }
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                error: 'Invalid parameters',
                details: error.errors
            });
        }
        logger.error('Error fetching full weather:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch weather data' });
    }
});

// GET /api/v1/weather/score - Calculate weather score for location
router.get('/score', async (req: Request, res: Response) => {
    try {
        const { lat, lon } = coordsSchema.parse(req.query);

        const weather = await getCurrentWeather(lat, lon);
        const score = calculateWeatherScore(weather);

        res.json({
            success: true,
            data: {
                location: { latitude: lat, longitude: lon },
                score,
                condition: weather.condition,
                description: weather.description,
                factors: {
                    temperature: weather.temperature,
                    windSpeed: weather.windSpeed,
                    visibility: weather.visibility,
                    cloudCover: weather.cloudCover
                }
            }
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                error: 'Invalid parameters',
                details: error.errors
            });
        }
        logger.error('Error calculating weather score:', error);
        res.status(500).json({ success: false, error: 'Failed to calculate score' });
    }
});

export default router;
