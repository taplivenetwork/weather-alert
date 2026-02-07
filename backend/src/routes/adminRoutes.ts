import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../config/database.js';
import { logger } from '../config/logger.js';
import { broadcastAreaAlert } from '../services/alertGeneratorService.js';
import { getConnectedUsersCount, getConnectedSockets } from '../services/socketService.js';
import type { AlertSeverity } from '../models/types.js';

const router = Router();

// Validation schemas
const broadcastSchema = z.object({
    lat: z.number().min(-90).max(90),
    lon: z.number().min(-180).max(180),
    radiusKm: z.number().min(1).max(500).default(10),
    severity: z.number().min(1).max(4) as z.ZodType<AlertSeverity>,
    title: z.string().min(1).max(255),
    description: z.string().min(1)
});

// GET /api/v1/admin/dashboard - Get admin dashboard data
router.get('/dashboard', async (req: Request, res: Response) => {
    try {
        // Get various stats
        const [
            alertStats,
            recentAlerts,
            orderStats,
            userCount
        ] = await Promise.all([
            // Alert statistics by severity
            query(`
        SELECT 
          severity,
          COUNT(*) as count,
          COUNT(CASE WHEN acknowledged_at IS NOT NULL THEN 1 END) as acknowledged_count
        FROM weather_alerts
        WHERE created_at > NOW() - INTERVAL '24 hours'
        GROUP BY severity
        ORDER BY severity
      `),
            // Recent alerts
            query(`
        SELECT id, place_name, severity, weather_type, title, created_at
        FROM weather_alerts
        ORDER BY created_at DESC
        LIMIT 10
      `),
            // Order statistics
            query(`
        SELECT 
          status,
          COUNT(*) as count
        FROM orders
        GROUP BY status
      `),
            // Total users
            query(`SELECT COUNT(*) as count FROM users`)
        ]);

        const connectedUsers = getConnectedUsersCount();

        res.json({
            success: true,
            data: {
                realtime: {
                    connectedUsers,
                    activeSockets: getConnectedSockets().length
                },
                alerts: {
                    last24Hours: alertStats.rows.reduce((sum, row) =>
                        sum + parseInt(row.count), 0),
                    bySeverity: alertStats.rows.map(row => ({
                        severity: row.severity,
                        total: parseInt(row.count),
                        acknowledged: parseInt(row.acknowledged_count)
                    })),
                    recent: recentAlerts.rows.map(row => ({
                        id: row.id,
                        placeName: row.place_name,
                        severity: row.severity,
                        weatherType: row.weather_type,
                        title: row.title,
                        createdAt: row.created_at
                    }))
                },
                orders: {
                    byStatus: orderStats.rows.reduce((acc, row) => {
                        acc[row.status] = parseInt(row.count);
                        return acc;
                    }, {} as Record<string, number>)
                },
                users: {
                    total: parseInt(userCount.rows[0]?.count || '0'),
                    connected: connectedUsers
                },
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        logger.error('Error fetching dashboard:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch dashboard data' });
    }
});

// POST /api/v1/admin/alerts/broadcast - Broadcast an alert
router.post('/alerts/broadcast', async (req: Request, res: Response) => {
    try {
        const data = broadcastSchema.parse(req.body);

        const notifiedCount = await broadcastAreaAlert(
            data.lat,
            data.lon,
            data.radiusKm,
            data.severity,
            data.title,
            data.description
        );

        logger.info('Admin broadcast alert', { ...data, notifiedCount });

        res.json({
            success: true,
            message: `Alert broadcast to ${notifiedCount} users`,
            data: {
                notifiedCount,
                location: { lat: data.lat, lon: data.lon },
                radiusKm: data.radiusKm,
                severity: data.severity
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
        logger.error('Error broadcasting alert:', error);
        res.status(500).json({ success: false, error: 'Failed to broadcast alert' });
    }
});

// GET /api/v1/admin/analytics/weather-impact - Get weather impact analytics
router.get('/analytics/weather-impact', async (req: Request, res: Response) => {
    try {
        const days = parseInt(req.query.days as string) || 7;

        const [
            alertsByDay,
            alertsByType,
            ackRates
        ] = await Promise.all([
            // Alerts by day
            query(`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as count
        FROM weather_alerts
        WHERE created_at > NOW() - INTERVAL '${days} days'
        GROUP BY DATE(created_at)
        ORDER BY date
      `),
            // Alerts by weather type
            query(`
        SELECT 
          weather_type,
          COUNT(*) as count
        FROM weather_alerts
        WHERE created_at > NOW() - INTERVAL '${days} days'
        GROUP BY weather_type
        ORDER BY count DESC
      `),
            // Acknowledgment rates
            query(`
        SELECT 
          severity,
          COUNT(*) as total,
          COUNT(CASE WHEN acknowledged_at IS NOT NULL THEN 1 END) as acknowledged,
          AVG(EXTRACT(EPOCH FROM (acknowledged_at - created_at))) as avg_ack_time_seconds
        FROM weather_alerts
        WHERE created_at > NOW() - INTERVAL '${days} days'
        GROUP BY severity
      `)
        ]);

        res.json({
            success: true,
            data: {
                period: `${days} days`,
                alertsByDay: alertsByDay.rows.map(row => ({
                    date: row.date,
                    count: parseInt(row.count)
                })),
                alertsByType: alertsByType.rows.map(row => ({
                    type: row.weather_type,
                    count: parseInt(row.count)
                })),
                acknowledgmentRates: ackRates.rows.map(row => ({
                    severity: row.severity,
                    total: parseInt(row.total),
                    acknowledged: parseInt(row.acknowledged),
                    rate: parseInt(row.acknowledged) / parseInt(row.total) * 100,
                    avgAckTimeSeconds: parseFloat(row.avg_ack_time_seconds) || null
                }))
            }
        });
    } catch (error) {
        logger.error('Error fetching analytics:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch analytics' });
    }
});

// GET /api/v1/admin/system/health - Get system health
router.get('/system/health', async (req: Request, res: Response) => {
    try {
        // Check database
        const dbStart = Date.now();
        await query('SELECT 1');
        const dbLatency = Date.now() - dbStart;

        res.json({
            success: true,
            data: {
                status: 'healthy',
                database: {
                    status: 'connected',
                    latencyMs: dbLatency
                },
                websocket: {
                    status: 'active',
                    connections: getConnectedSockets().length
                },
                uptime: process.uptime(),
                memory: process.memoryUsage(),
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        logger.error('Health check failed:', error);
        res.status(503).json({
            success: false,
            data: {
                status: 'unhealthy',
                error: 'Service unavailable'
            }
        });
    }
});

export default router;
