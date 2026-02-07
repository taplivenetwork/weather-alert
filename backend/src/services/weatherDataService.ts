import axios from 'axios';
import { logger } from '../config/logger.js';
import {
    getCachedWeather,
    setCachedWeather,
    getCachedForecast,
    setCachedForecast
} from '../config/redis.js';
import type {
    WeatherData,
    CurrentWeather,
    HourlyForecast,
    DailyForecast,
    WeatherServiceAlert
} from '../models/types.js';

const OPENWEATHERMAP_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

interface OpenWeatherCurrentResponse {
    coord: { lon: number; lat: number };
    weather: Array<{ id: number; main: string; description: string; icon: string }>;
    main: { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number };
    visibility: number;
    wind: { speed: number; deg: number };
    clouds: { all: number };
    sys: { country: string; sunrise: number; sunset: number };
    name: string;
}

interface OpenWeatherForecastResponse {
    list: Array<{
        dt: number;
        main: { temp: number; feels_like: number; humidity: number };
        weather: Array<{ main: string; description: string; icon: string }>;
        wind: { speed: number };
        pop: number;
    }>;
}

interface OpenWeatherOneCallResponse {
    current: {
        dt: number;
        sunrise: number;
        sunset: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        uvi: number;
        clouds: number;
        visibility: number;
        wind_speed: number;
        wind_deg: number;
        weather: Array<{ id: number; main: string; description: string; icon: string }>;
    };
    hourly: Array<{
        dt: number;
        temp: number;
        feels_like: number;
        humidity: number;
        wind_speed: number;
        weather: Array<{ main: string; icon: string }>;
        pop: number;
    }>;
    daily: Array<{
        dt: number;
        sunrise: number;
        sunset: number;
        temp: { min: number; max: number };
        humidity: number;
        wind_speed: number;
        weather: Array<{ main: string; description: string; icon: string }>;
        pop: number;
    }>;
    alerts?: Array<{
        sender_name: string;
        event: string;
        start: number;
        end: number;
        description: string;
    }>;
}

export async function getCurrentWeather(lat: number, lon: number): Promise<CurrentWeather> {
    // Check cache first
    const cached = await getCachedWeather(lat, lon);
    if (cached) {
        logger.debug('Cache hit for current weather', { lat, lon });
        return JSON.parse(cached);
    }

    if (!OPENWEATHERMAP_API_KEY) {
        throw new Error('OpenWeatherMap API key not configured');
    }

    try {
        const response = await axios.get<OpenWeatherCurrentResponse>(
            `${OPENWEATHERMAP_BASE_URL}/weather`,
            {
                params: {
                    lat,
                    lon,
                    appid: OPENWEATHERMAP_API_KEY,
                    units: 'imperial' // Use imperial, convert later based on user preference
                }
            }
        );

        const data = response.data;
        const current: CurrentWeather = {
            temperature: data.main.temp,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            windSpeed: data.wind.speed,
            windDirection: data.wind.deg,
            visibility: data.visibility / 1609.34, // Convert meters to miles
            cloudCover: data.clouds.all,
            condition: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            sunrise: new Date(data.sys.sunrise * 1000),
            sunset: new Date(data.sys.sunset * 1000)
        };

        // Cache the result
        await setCachedWeather(lat, lon, current);
        logger.info('Fetched current weather', { lat, lon, condition: current.condition });

        return current;
    } catch (error) {
        logger.error('Error fetching current weather:', error);
        throw new Error('Failed to fetch weather data');
    }
}

export async function getWeatherForecast(lat: number, lon: number, hours: number = 48): Promise<{
    hourly: HourlyForecast[];
    daily: DailyForecast[];
}> {
    // Check cache
    const cached = await getCachedForecast(lat, lon);
    if (cached) {
        logger.debug('Cache hit for forecast', { lat, lon });
        return JSON.parse(cached);
    }

    if (!OPENWEATHERMAP_API_KEY) {
        throw new Error('OpenWeatherMap API key not configured');
    }

    try {
        // Use 5-day forecast API (free tier)
        const response = await axios.get<OpenWeatherForecastResponse>(
            `${OPENWEATHERMAP_BASE_URL}/forecast`,
            {
                params: {
                    lat,
                    lon,
                    appid: OPENWEATHERMAP_API_KEY,
                    units: 'imperial'
                }
            }
        );

        const data = response.data;

        // Process hourly forecast (3-hour intervals from free API)
        const hourly: HourlyForecast[] = data.list.slice(0, Math.ceil(hours / 3)).map(item => ({
            datetime: new Date(item.dt * 1000),
            temperature: item.main.temp,
            feelsLike: item.main.feels_like,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
            condition: item.weather[0].main,
            icon: item.weather[0].icon,
            precipitationProbability: item.pop * 100
        }));

        // Aggregate daily forecast
        const dailyMap = new Map<string, any[]>();
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000).toDateString();
            if (!dailyMap.has(date)) {
                dailyMap.set(date, []);
            }
            dailyMap.get(date)!.push(item);
        });

        const daily: DailyForecast[] = Array.from(dailyMap.entries()).map(([dateStr, items]) => {
            const temps = items.map(i => i.main.temp);
            const item = items[Math.floor(items.length / 2)]; // Middle of day
            return {
                date: new Date(dateStr),
                tempMin: Math.min(...temps),
                tempMax: Math.max(...temps),
                humidity: item.main.humidity,
                windSpeed: Math.max(...items.map(i => i.wind.speed)),
                condition: item.weather[0].main,
                description: item.weather[0].description,
                icon: item.weather[0].icon,
                precipitationProbability: Math.max(...items.map(i => i.pop)) * 100,
                sunrise: new Date(), // Not available in free API
                sunset: new Date()
            };
        });

        const result = { hourly, daily };
        await setCachedForecast(lat, lon, result);
        logger.info('Fetched weather forecast', { lat, lon, hours: hourly.length });

        return result;
    } catch (error) {
        logger.error('Error fetching forecast:', error);
        throw new Error('Failed to fetch forecast data');
    }
}

export async function getFullWeatherData(lat: number, lon: number): Promise<WeatherData> {
    const [current, forecast] = await Promise.all([
        getCurrentWeather(lat, lon),
        getWeatherForecast(lat, lon)
    ]);

    return {
        location: {
            latitude: lat,
            longitude: lon
        },
        current,
        hourlyForecast: forecast.hourly,
        dailyForecast: forecast.daily,
        alerts: [], // Alerts handled separately
        fetchedAt: new Date(),
        source: 'openweathermap'
    };
}

// Calculate weather score for dispatch (0-100)
export function calculateWeatherScore(weather: CurrentWeather): number {
    let score = 100;
    const condition = weather.condition.toLowerCase();

    // Base score by condition
    const conditionScores: Record<string, number> = {
        'clear': 100,
        'clouds': 85,
        'partly cloudy': 90,
        'mist': 70,
        'fog': 60,
        'drizzle': 65,
        'rain': 50,
        'snow': 45,
        'thunderstorm': 20,
        'tornado': 0,
        'hurricane': 0
    };

    score = conditionScores[condition] ?? 75;

    // Wind penalty
    if (weather.windSpeed > 25) score -= 20;
    else if (weather.windSpeed > 15) score -= 10;
    else if (weather.windSpeed > 10) score -= 5;

    // Visibility penalty
    if (weather.visibility < 1) score -= 25;
    else if (weather.visibility < 3) score -= 15;
    else if (weather.visibility < 5) score -= 5;

    // Extreme temperature penalty
    if (weather.temperature > 100 || weather.temperature < 20) score -= 15;
    else if (weather.temperature > 95 || weather.temperature < 32) score -= 10;

    return Math.max(0, Math.min(100, score));
}

// Determine alert severity based on weather conditions
export function determineAlertSeverity(weather: CurrentWeather): 1 | 2 | 3 | 4 | null {
    const condition = weather.condition.toLowerCase();

    // Level 4 - Emergency
    if (['tornado', 'hurricane'].includes(condition)) {
        return 4;
    }

    // Level 3 - Warning
    if (['thunderstorm'].includes(condition) || weather.windSpeed > 50) {
        return 3;
    }

    // Level 2 - Advisory
    if (['rain', 'snow'].includes(condition) && weather.windSpeed > 25) {
        return 2;
    }
    if (weather.visibility < 1 || weather.temperature > 105 || weather.temperature < 10) {
        return 2;
    }

    // Level 1 - Informational
    if (['rain', 'snow', 'drizzle'].includes(condition)) {
        return 1;
    }
    if (weather.windSpeed > 15 || weather.visibility < 3) {
        return 1;
    }

    return null; // No alert needed
}
