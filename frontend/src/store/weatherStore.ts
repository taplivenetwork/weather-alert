import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';

const API_BASE = 'http://localhost:3001/api/v1';

interface WeatherData {
    temperature: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection: number;
    visibility: number;
    cloudCover: number;
    condition: string;
    description: string;
    icon: string;
    weatherScore: number;
}

interface Forecast {
    datetime: string;
    temperature: number;
    condition: string;
    icon: string;
    precipitationProbability: number;
}

interface Alert {
    id: string;
    severity: 1 | 2 | 3 | 4;
    weatherType: string;
    title: string;
    description: string;
    recommendation: string;
    location: { latitude: number; longitude: number; placeName?: string };
    createdAt: string;
    acknowledgedAt?: string;
}

interface WeatherState {
    // Connection
    socket: Socket | null;
    isConnected: boolean;

    // Location
    currentLocation: { lat: number; lon: number } | null;

    // Weather data
    currentWeather: WeatherData | null;
    forecast: Forecast[];
    isLoading: boolean;
    error: string | null;

    // Alerts
    alerts: Alert[];
    unreadAlerts: number;

    // User
    userId: string | null;
    preferences: {
        temperatureUnit: 'C' | 'F';
        windUnit: 'mph' | 'kph';
        alertInfo: boolean;
        alertAdvisory: boolean;
        alertWarning: boolean;
        alertEmergency: boolean;
        notifyPush: boolean;
        notifySms: boolean;
        notifyEmail: boolean;
    };

    // Actions
    initializeSocket: () => void;
    disconnectSocket: () => void;
    setLocation: (lat: number, lon: number) => void;
    fetchWeather: (lat: number, lon: number) => Promise<void>;
    fetchForecast: (lat: number, lon: number) => Promise<void>;
    fetchAlerts: () => Promise<void>;
    acknowledgeAlert: (alertId: string) => Promise<void>;
    updatePreferences: (prefs: Partial<WeatherState['preferences']>) => void;
    addAlert: (alert: Alert) => void;
}

// Demo user ID for testing
const DEMO_USER_ID = '00000000-0000-0000-0000-000000000001';

export const useWeatherStore = create<WeatherState>((set, get) => ({
    socket: null,
    isConnected: false,
    currentLocation: null,
    currentWeather: null,
    forecast: [],
    isLoading: false,
    error: null,
    alerts: [],
    unreadAlerts: 0,
    userId: DEMO_USER_ID,
    preferences: {
        temperatureUnit: 'F',
        windUnit: 'mph',
        alertInfo: true,
        alertAdvisory: true,
        alertWarning: true,
        alertEmergency: true,
        notifyPush: true,
        notifySms: true,
        notifyEmail: true,
    },

    initializeSocket: () => {
        const socket = io('http://localhost:3001', {
            transports: ['websocket', 'polling'],
        });

        socket.on('connect', () => {
            console.log('🔌 Connected to Weather Alert Server');
            set({ isConnected: true });
            socket.emit('identify', get().userId);
        });

        socket.on('disconnect', () => {
            console.log('❌ Disconnected from server');
            set({ isConnected: false });
        });

        socket.on('weather_alert', (alert: Alert) => {
            console.log('🚨 Received alert:', alert);
            get().addAlert(alert);
        });

        socket.on('weather_update', (data: { location: { lat: number; lon: number }; data: WeatherData }) => {
            console.log('🌤️ Weather update:', data);
            const { currentLocation } = get();
            if (
                currentLocation &&
                Math.abs(data.location.lat - currentLocation.lat) < 0.1 &&
                Math.abs(data.location.lon - currentLocation.lon) < 0.1
            ) {
                set({ currentWeather: data.data });
            }
        });

        set({ socket });
    },

    disconnectSocket: () => {
        const { socket } = get();
        if (socket) {
            socket.disconnect();
            set({ socket: null, isConnected: false });
        }
    },

    setLocation: (lat, lon) => {
        set({ currentLocation: { lat, lon } });
        get().fetchWeather(lat, lon);
        get().fetchForecast(lat, lon);

        // Subscribe to location updates
        const { socket } = get();
        if (socket) {
            socket.emit('subscribe_location', { lat, lon });
        }
    },

    fetchWeather: async (lat, lon) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_BASE}/weather/current`, {
                params: { lat, lon }
            });
            if (response.data.success) {
                set({ currentWeather: response.data.data, isLoading: false });
            }
        } catch (error) {
            console.error('Failed to fetch weather:', error);
            set({
                error: 'Failed to fetch weather data',
                isLoading: false,
                // Set demo data for offline/no-API mode
                currentWeather: {
                    temperature: 72,
                    feelsLike: 74,
                    humidity: 45,
                    pressure: 1013,
                    windSpeed: 8,
                    windDirection: 180,
                    visibility: 10,
                    cloudCover: 20,
                    condition: 'Clear',
                    description: 'clear sky',
                    icon: '01d',
                    weatherScore: 95
                }
            });
        }
    },

    fetchForecast: async (lat, lon) => {
        try {
            const response = await axios.get(`${API_BASE}/weather/forecast`, {
                params: { lat, lon, hours: 24 }
            });
            if (response.data.success) {
                set({ forecast: response.data.data.hourly || [] });
            }
        } catch (error) {
            console.error('Failed to fetch forecast:', error);
            // Set demo forecast data
            const demoForecast: Forecast[] = Array.from({ length: 8 }, (_, i) => ({
                datetime: new Date(Date.now() + i * 3 * 3600000).toISOString(),
                temperature: 70 + Math.floor(Math.random() * 10),
                condition: ['Clear', 'Clouds', 'Rain'][Math.floor(Math.random() * 3)],
                icon: ['01d', '03d', '10d'][Math.floor(Math.random() * 3)],
                precipitationProbability: Math.floor(Math.random() * 30)
            }));
            set({ forecast: demoForecast });
        }
    },

    fetchAlerts: async () => {
        const { userId } = get();
        if (!userId) return;

        try {
            const response = await axios.get(`${API_BASE}/alerts`, {
                params: { userId, limit: 20 }
            });
            if (response.data.success) {
                const alerts = response.data.data || [];
                set({
                    alerts,
                    unreadAlerts: alerts.filter((a: Alert) => !a.acknowledgedAt).length
                });
            }
        } catch (error) {
            console.error('Failed to fetch alerts:', error);
            // Set demo alerts
            set({
                alerts: [
                    {
                        id: '1',
                        severity: 1 as const,
                        weatherType: 'clouds',
                        title: '🌤️ Weather Update',
                        description: 'Light clouds expected this afternoon.',
                        recommendation: 'No action needed.',
                        location: { latitude: 40.7128, longitude: -74.0060, placeName: 'New York, NY' },
                        createdAt: new Date().toISOString()
                    },
                    {
                        id: '2',
                        severity: 2 as const,
                        weatherType: 'rain',
                        title: '⚠️ Weather Advisory',
                        description: 'Rain expected in the next 2 hours.',
                        recommendation: 'Consider bringing an umbrella.',
                        location: { latitude: 40.7128, longitude: -74.0060, placeName: 'New York, NY' },
                        createdAt: new Date(Date.now() - 3600000).toISOString()
                    }
                ],
                unreadAlerts: 1
            });
        }
    },

    acknowledgeAlert: async (alertId) => {
        const { userId, alerts } = get();
        if (!userId) return;

        try {
            await axios.post(`${API_BASE}/alerts/${alertId}/acknowledge`, { userId });
            set({
                alerts: alerts.map(a =>
                    a.id === alertId ? { ...a, acknowledgedAt: new Date().toISOString() } : a
                ),
                unreadAlerts: Math.max(0, get().unreadAlerts - 1)
            });
        } catch (error) {
            console.error('Failed to acknowledge alert:', error);
            // Update locally anyway for demo
            set({
                alerts: alerts.map(a =>
                    a.id === alertId ? { ...a, acknowledgedAt: new Date().toISOString() } : a
                ),
                unreadAlerts: Math.max(0, get().unreadAlerts - 1)
            });
        }
    },

    updatePreferences: (prefs) => {
        set(state => ({
            preferences: { ...state.preferences, ...prefs }
        }));
    },

    addAlert: (alert) => {
        set(state => ({
            alerts: [alert, ...state.alerts],
            unreadAlerts: state.unreadAlerts + 1
        }));
    }
}));
