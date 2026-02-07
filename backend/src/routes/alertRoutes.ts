import { Router, Request, Response } from 'express';
import { z } from 'zod';
import {
    getUserAlerts,
    acknowledgeAlert,
    submitAlertFeedback,
    checkAndGenerateAlerts
} from '../services/alertGeneratorService.js';
import { logger } from '../config/logger.js';

const router = Router();

// Validation schemas
const getAlertsSchema = z.object({
    userId: z.string().uuid(),
    limit: z.string().optional().transform(val => val ? parseInt(val) : 50),
    offset: z.string().optional().transform(val => val ? parseInt(val) : 0),
    acknowledged: z.string().optional().transform(val => val ? val === 'true' : undefined)
});

const acknowledgeSchema = z.object({
    userId: z.string().uuid()
});

const feedbackSchema = z.object({
    userId: z.string().uuid(),
    rating: z.number().min(1).max(5),
    text: z.string().optional()
});

const checkWeatherSchema = z.object({
    userId: z.string().uuid(),
    lat: z.number().min(-90).max(90),
    lon: z.number().min(-180).max(180),
    placeName: z.string().optional()
});

// GET /api/v1/alerts - Get alerts for a user
router.get('/', async (req: Request, res: Response) => {
    try {
        const params = getAlertsSchema.parse(req.query);

        const alerts = await getUserAlerts(params.userId, {
            limit: params.limit,
            offset: params.offset,
            acknowledged: params.acknowledged
        });

        res.json({
            success: true,
            data: alerts,
            pagination: {
                limit: params.limit,
                offset: params.offset,
                count: alerts.length
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
        logger.error('Error fetching alerts:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch alerts' });
    }
});

// POST /api/v1/alerts/:alertId/acknowledge - Acknowledge an alert
router.post('/:alertId/acknowledge', async (req: Request, res: Response) => {
    try {
        const alertId = req.params.alertId;
        const { userId } = acknowledgeSchema.parse(req.body);

        const success = await acknowledgeAlert(alertId, userId);

        if (success) {
            res.json({ success: true, message: 'Alert acknowledged' });
        } else {
            res.status(404).json({
                success: false,
                error: 'Alert not found or already acknowledged'
            });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                error: 'Invalid parameters',
                details: error.errors
            });
        }
        logger.error('Error acknowledging alert:', error);
        res.status(500).json({ success: false, error: 'Failed to acknowledge alert' });
    }
});

// POST /api/v1/alerts/:alertId/feedback - Submit feedback for an alert
router.post('/:alertId/feedback', async (req: Request, res: Response) => {
    try {
        const alertId = req.params.alertId;
        const { userId, rating, text } = feedbackSchema.parse(req.body);

        const success = await submitAlertFeedback(alertId, userId, rating, text);

        if (success) {
            res.json({ success: true, message: 'Feedback submitted' });
        } else {
            res.status(404).json({ success: false, error: 'Alert not found' });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                error: 'Invalid parameters',
                details: error.errors
            });
        }
        logger.error('Error submitting feedback:', error);
        res.status(500).json({ success: false, error: 'Failed to submit feedback' });
    }
});

// POST /api/v1/alerts/check - Check weather and generate alert if needed
router.post('/check', async (req: Request, res: Response) => {
    try {
        const { userId, lat, lon, placeName } = checkWeatherSchema.parse(req.body);

        const alert = await checkAndGenerateAlerts(userId, lat, lon, placeName);

        res.json({
            success: true,
            data: {
                alertGenerated: alert !== null,
                alert
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
        logger.error('Error checking weather:', error);
        res.status(500).json({ success: false, error: 'Failed to check weather' });
    }
});

export default router;
