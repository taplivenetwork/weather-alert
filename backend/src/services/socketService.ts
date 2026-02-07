import { Server as SocketIOServer, Socket } from 'socket.io';
import { logger } from '../config/logger.js';
import type { WeatherAlert } from '../models/types.js';

let io: SocketIOServer | null = null;
const userSockets = new Map<string, Set<string>>(); // userId -> Set of socketIds

export function setupSocketHandlers(socketServer: SocketIOServer): void {
    io = socketServer;

    io.on('connection', (socket: Socket) => {
        logger.info('Client connected', { socketId: socket.id });

        // Handle user authentication/identification
        socket.on('identify', (userId: string) => {
            if (!userId) return;

            // Track user's socket connections
            if (!userSockets.has(userId)) {
                userSockets.set(userId, new Set());
            }
            userSockets.get(userId)!.add(socket.id);

            // Join user-specific room
            socket.join(`user:${userId}`);
            logger.info('User identified', { userId, socketId: socket.id });

            socket.emit('identified', { userId, status: 'connected' });
        });

        // Subscribe to location-based alerts
        socket.on('subscribe_location', (data: { lat: number; lon: number; radius?: number }) => {
            const { lat, lon, radius = 50 } = data;
            const locationRoom = `location:${lat.toFixed(2)}:${lon.toFixed(2)}`;
            socket.join(locationRoom);
            logger.debug('Subscribed to location', { socketId: socket.id, lat, lon });
        });

        // Unsubscribe from location
        socket.on('unsubscribe_location', (data: { lat: number; lon: number }) => {
            const { lat, lon } = data;
            const locationRoom = `location:${lat.toFixed(2)}:${lon.toFixed(2)}`;
            socket.leave(locationRoom);
        });

        // Request weather update
        socket.on('request_weather', async (data: { lat: number; lon: number }) => {
            // This would trigger a weather fetch and emit the result
            socket.emit('weather_requested', { status: 'processing', ...data });
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            // Remove socket from user tracking
            userSockets.forEach((sockets, userId) => {
                if (sockets.has(socket.id)) {
                    sockets.delete(socket.id);
                    if (sockets.size === 0) {
                        userSockets.delete(userId);
                    }
                }
            });
            logger.info('Client disconnected', { socketId: socket.id });
        });

        // Handle errors
        socket.on('error', (error) => {
            logger.error('Socket error', { socketId: socket.id, error });
        });
    });

    logger.info('Socket handlers configured');
}

// Send notification to specific user
export function notifyUser(userId: string, event: string, data: unknown): boolean {
    if (!io) {
        logger.warn('Socket.io not initialized');
        return false;
    }

    io.to(`user:${userId}`).emit(event, data);
    logger.debug('Notified user', { userId, event });
    return true;
}

// Broadcast alert to all connected clients
export function broadcastAlert(alert: WeatherAlert): void {
    if (!io) {
        logger.warn('Socket.io not initialized');
        return;
    }

    io.emit('weather_alert', alert);
    logger.info('Broadcast alert to all clients', { alertId: alert.id, severity: alert.severity });
}

// Send alert to users in a specific location
export function notifyLocation(
    lat: number,
    lon: number,
    event: string,
    data: unknown
): void {
    if (!io) {
        logger.warn('Socket.io not initialized');
        return;
    }

    const locationRoom = `location:${lat.toFixed(2)}:${lon.toFixed(2)}`;
    io.to(locationRoom).emit(event, data);
    logger.debug('Notified location', { lat, lon, event });
}

// Get count of connected users
export function getConnectedUsersCount(): number {
    return userSockets.size;
}

// Get all connected socket IDs
export function getConnectedSockets(): string[] {
    if (!io) return [];
    return Array.from(io.sockets.sockets.keys());
}

// Emit weather update to all clients
export function broadcastWeatherUpdate(
    lat: number,
    lon: number,
    weatherData: unknown
): void {
    if (!io) return;

    const locationRoom = `location:${lat.toFixed(2)}:${lon.toFixed(2)}`;
    io.to(locationRoom).emit('weather_update', {
        location: { lat, lon },
        data: weatherData,
        timestamp: new Date().toISOString()
    });
}
