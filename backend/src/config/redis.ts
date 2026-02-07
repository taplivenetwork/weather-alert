import Redis from 'ioredis';
import { logger } from './logger.js';

let redis: Redis | null = null;

export function getRedis(): Redis {
    if (!redis) {
        throw new Error('Redis not initialized. Call initializeRedis() first.');
    }
    return redis;
}

export async function initializeRedis(): Promise<void> {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

    redis = new Redis(redisUrl, {
        maxRetriesPerRequest: 3,
        lazyConnect: true
    });

    redis.on('error', (err) => {
        logger.error('Redis error:', err);
    });

    redis.on('connect', () => {
        logger.info('Redis connected');
    });

    try {
        await redis.connect();
    } catch (err) {
        logger.warn('Redis connection failed, continuing without cache:', err);
    }
}

// Weather cache helpers
const WEATHER_CACHE_TTL = 300; // 5 minutes

export async function getCachedWeather(lat: number, lon: number): Promise<string | null> {
    const key = `weather:${lat.toFixed(4)}:${lon.toFixed(4)}`;
    return redis?.get(key) || null;
}

export async function setCachedWeather(lat: number, lon: number, data: object): Promise<void> {
    const key = `weather:${lat.toFixed(4)}:${lon.toFixed(4)}`;
    await redis?.setex(key, WEATHER_CACHE_TTL, JSON.stringify(data));
}

export async function getCachedForecast(lat: number, lon: number): Promise<string | null> {
    const key = `forecast:${lat.toFixed(4)}:${lon.toFixed(4)}`;
    return redis?.get(key) || null;
}

export async function setCachedForecast(lat: number, lon: number, data: object): Promise<void> {
    const key = `forecast:${lat.toFixed(4)}:${lon.toFixed(4)}`;
    await redis?.setex(key, WEATHER_CACHE_TTL * 2, JSON.stringify(data)); // 10 min for forecast
}

export async function getCachedAlerts(lat: number, lon: number): Promise<string | null> {
    const key = `alerts:${lat.toFixed(4)}:${lon.toFixed(4)}`;
    return redis?.get(key) || null;
}

export async function setCachedAlerts(lat: number, lon: number, data: object): Promise<void> {
    const key = `alerts:${lat.toFixed(4)}:${lon.toFixed(4)}`;
    await redis?.setex(key, 60, JSON.stringify(data)); // 1 min for alerts (need freshness)
}
