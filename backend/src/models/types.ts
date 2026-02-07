// User types
export interface User {
    id: string;
    email: string;
    phone?: string;
    name?: string;
    temperatureUnit: 'C' | 'F' | 'K';
    windUnit: 'mph' | 'kph' | 'ms' | 'knots';
    createdAt: Date;
    updatedAt: Date;
}

export interface UserPreferences {
    userId: string;
    alertInfo: boolean;
    alertAdvisory: boolean;
    alertWarning: boolean;
    alertEmergency: boolean;
    notifyPush: boolean;
    notifySms: boolean;
    notifyEmail: boolean;
    quietHoursEnabled: boolean;
    quietHoursStart?: string;
    quietHoursEnd?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
}

// Alert types
export type AlertSeverity = 1 | 2 | 3 | 4;
export type WeatherType =
    | 'clear'
    | 'clouds'
    | 'rain'
    | 'snow'
    | 'thunderstorm'
    | 'tornado'
    | 'hurricane'
    | 'flood'
    | 'wind'
    | 'heat'
    | 'cold'
    | 'other';

export interface WeatherAlert {
    id: string;
    userId: string;
    orderId?: string;
    location: {
        latitude: number;
        longitude: number;
        placeName?: string;
    };
    severity: AlertSeverity;
    weatherType: WeatherType;
    title: string;
    description: string;
    recommendation: string;
    validFrom: Date;
    validUntil: Date;
    deliveredAt?: Date;
    acknowledgedAt?: Date;
    feedbackRating?: number;
    feedbackText?: string;
    createdAt: Date;
}

export interface CreateAlertInput {
    userId: string;
    orderId?: string;
    latitude: number;
    longitude: number;
    placeName?: string;
    severity: AlertSeverity;
    weatherType: WeatherType;
    title: string;
    description: string;
    recommendation: string;
    validFrom?: Date;
    validUntil?: Date;
}

// Weather data types
export interface CurrentWeather {
    temperature: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection: number;
    visibility: number;
    cloudCover: number;
    uvIndex?: number;
    condition: string;
    description: string;
    icon: string;
    sunrise?: Date;
    sunset?: Date;
}

export interface HourlyForecast {
    datetime: Date;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    icon: string;
    precipitationProbability: number;
}

export interface DailyForecast {
    date: Date;
    tempMin: number;
    tempMax: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    description: string;
    icon: string;
    precipitationProbability: number;
    sunrise: Date;
    sunset: Date;
}

export interface WeatherData {
    location: {
        latitude: number;
        longitude: number;
        name?: string;
        country?: string;
    };
    current: CurrentWeather;
    hourlyForecast: HourlyForecast[];
    dailyForecast: DailyForecast[];
    alerts: WeatherServiceAlert[];
    fetchedAt: Date;
    source: string;
}

export interface WeatherServiceAlert {
    event: string;
    sender: string;
    headline: string;
    description: string;
    severity: string;
    start: Date;
    end: Date;
}

// Order types
export interface Order {
    id: string;
    customerId: string;
    providerId?: string;
    destinationLat: number;
    destinationLon: number;
    destinationName?: string;
    scheduledAt?: Date;
    weatherScore?: number;
    status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' | 'paused';
    createdAt: Date;
    updatedAt: Date;
}

export interface WeatherScore {
    orderId: string;
    providerId: string;
    providerLocation: {
        latitude: number;
        longitude: number;
    };
    destinationLocation: {
        latitude: number;
        longitude: number;
    };
    currentScore: number;
    forecastScore: number;
    travelScore: number;
    overallScore: number;
    calculatedAt: Date;
    factors: {
        currentWeather: string;
        destinationWeather: string;
        travelConditions: string;
        equipmentBonus: number;
    };
}

// API response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
