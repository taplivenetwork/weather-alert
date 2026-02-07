import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
import { logger } from './config/logger.js';
import { initializeDatabase } from './config/database.js';
import { initializeRedis } from './config/redis.js';
import weatherRoutes from './routes/weatherRoutes.js';
import alertRoutes from './routes/alertRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { setupSocketHandlers } from './services/socketService.js';
import { startWeatherPollingJob } from './jobs/weatherPollingJob.js';
import { startAlertMonitoringJob } from './jobs/alertMonitoringJob.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`, {
        query: req.query,
        ip: req.ip
    });
    next();
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v1/weather', weatherRoutes);
app.use('/api/v1/alerts', alertRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admin', adminRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error('Unhandled error:', { error: err.message, stack: err.stack });
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Initialize and start server
async function startServer() {
    try {
        // Initialize database
        await initializeDatabase();
        logger.info('Database initialized');

        // Initialize Redis
        await initializeRedis();
        logger.info('Redis initialized');

        // Setup WebSocket handlers
        setupSocketHandlers(io);
        logger.info('WebSocket handlers configured');

        // Start background jobs
        startWeatherPollingJob();
        startAlertMonitoringJob();
        logger.info('Background jobs started');

        // Start server
        const PORT = process.env.PORT || 3001;
        httpServer.listen(PORT, () => {
            logger.info(`🌤️ Weather Alert System running on port ${PORT}`);
            logger.info(`📡 WebSocket server ready`);
            logger.info(`🔗 API: http://localhost:${PORT}/api/v1`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Export for testing
export { app, io };

// Start the server
startServer();
