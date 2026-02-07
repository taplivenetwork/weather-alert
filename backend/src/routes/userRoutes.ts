import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../config/database.js';
import { logger } from '../config/logger.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Validation schemas
const createUserSchema = z.object({
    email: z.string().email(),
    phone: z.string().optional(),
    name: z.string().optional(),
    temperatureUnit: z.enum(['C', 'F', 'K']).optional().default('F'),
    windUnit: z.enum(['mph', 'kph', 'ms', 'knots']).optional().default('mph')
});

const updatePreferencesSchema = z.object({
    alertInfo: z.boolean().optional(),
    alertAdvisory: z.boolean().optional(),
    alertWarning: z.boolean().optional(),
    alertEmergency: z.boolean().optional(),
    notifyPush: z.boolean().optional(),
    notifySms: z.boolean().optional(),
    notifyEmail: z.boolean().optional(),
    quietHoursEnabled: z.boolean().optional(),
    quietHoursStart: z.string().optional(),
    quietHoursEnd: z.string().optional(),
    emergencyContactName: z.string().optional(),
    emergencyContactPhone: z.string().optional()
});

// POST /api/v1/users - Create a new user
router.post('/', async (req: Request, res: Response) => {
    try {
        const userData = createUserSchema.parse(req.body);
        const userId = uuidv4();

        // Create user
        await query(
            `INSERT INTO users (id, email, phone, name, temperature_unit, wind_unit)
       VALUES ($1, $2, $3, $4, $5, $6)`,
            [userId, userData.email, userData.phone, userData.name,
                userData.temperatureUnit, userData.windUnit]
        );

        // Create default preferences
        await query(
            `INSERT INTO user_preferences (user_id)
       VALUES ($1)`,
            [userId]
        );

        res.status(201).json({
            success: true,
            data: {
                id: userId,
                ...userData
            }
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                error: 'Invalid parameters',
                details: error.errors
            });
        }
        if (error.code === '23505') { // Unique violation
            return res.status(409).json({
                success: false,
                error: 'Email already exists'
            });
        }
        logger.error('Error creating user:', error);
        res.status(500).json({ success: false, error: 'Failed to create user' });
    }
});

// GET /api/v1/users/:userId - Get user by ID
router.get('/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const result = await query(
            `SELECT u.*, up.* FROM users u
       LEFT JOIN user_preferences up ON u.id = up.user_id
       WHERE u.id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const row = result.rows[0];
        res.json({
            success: true,
            data: {
                id: row.id,
                email: row.email,
                phone: row.phone,
                name: row.name,
                temperatureUnit: row.temperature_unit,
                windUnit: row.wind_unit,
                createdAt: row.created_at,
                preferences: {
                    alertInfo: row.alert_info,
                    alertAdvisory: row.alert_advisory,
                    alertWarning: row.alert_warning,
                    alertEmergency: row.alert_emergency,
                    notifyPush: row.notify_push,
                    notifySms: row.notify_sms,
                    notifyEmail: row.notify_email,
                    quietHoursEnabled: row.quiet_hours_enabled,
                    quietHoursStart: row.quiet_hours_start,
                    quietHoursEnd: row.quiet_hours_end,
                    emergencyContactName: row.emergency_contact_name,
                    emergencyContactPhone: row.emergency_contact_phone
                }
            }
        });
    } catch (error) {
        logger.error('Error fetching user:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch user' });
    }
});

// GET /api/v1/users/:userId/preferences - Get user preferences
router.get('/:userId/preferences', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const result = await query(
            `SELECT * FROM user_preferences WHERE user_id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const row = result.rows[0];
        res.json({
            success: true,
            data: {
                alertInfo: row.alert_info,
                alertAdvisory: row.alert_advisory,
                alertWarning: row.alert_warning,
                alertEmergency: row.alert_emergency,
                notifyPush: row.notify_push,
                notifySms: row.notify_sms,
                notifyEmail: row.notify_email,
                quietHoursEnabled: row.quiet_hours_enabled,
                quietHoursStart: row.quiet_hours_start,
                quietHoursEnd: row.quiet_hours_end,
                emergencyContactName: row.emergency_contact_name,
                emergencyContactPhone: row.emergency_contact_phone
            }
        });
    } catch (error) {
        logger.error('Error fetching preferences:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch preferences' });
    }
});

// PUT /api/v1/users/:userId/preferences - Update user preferences
router.put('/:userId/preferences', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const updates = updatePreferencesSchema.parse(req.body);

        // Build dynamic update query
        const setClauses: string[] = [];
        const values: any[] = [userId];
        let paramIndex = 2;

        if (updates.alertInfo !== undefined) {
            setClauses.push(`alert_info = $${paramIndex++}`);
            values.push(updates.alertInfo);
        }
        if (updates.alertAdvisory !== undefined) {
            setClauses.push(`alert_advisory = $${paramIndex++}`);
            values.push(updates.alertAdvisory);
        }
        if (updates.alertWarning !== undefined) {
            setClauses.push(`alert_warning = $${paramIndex++}`);
            values.push(updates.alertWarning);
        }
        if (updates.alertEmergency !== undefined) {
            setClauses.push(`alert_emergency = $${paramIndex++}`);
            values.push(updates.alertEmergency);
        }
        if (updates.notifyPush !== undefined) {
            setClauses.push(`notify_push = $${paramIndex++}`);
            values.push(updates.notifyPush);
        }
        if (updates.notifySms !== undefined) {
            setClauses.push(`notify_sms = $${paramIndex++}`);
            values.push(updates.notifySms);
        }
        if (updates.notifyEmail !== undefined) {
            setClauses.push(`notify_email = $${paramIndex++}`);
            values.push(updates.notifyEmail);
        }
        if (updates.quietHoursEnabled !== undefined) {
            setClauses.push(`quiet_hours_enabled = $${paramIndex++}`);
            values.push(updates.quietHoursEnabled);
        }
        if (updates.quietHoursStart !== undefined) {
            setClauses.push(`quiet_hours_start = $${paramIndex++}`);
            values.push(updates.quietHoursStart);
        }
        if (updates.quietHoursEnd !== undefined) {
            setClauses.push(`quiet_hours_end = $${paramIndex++}`);
            values.push(updates.quietHoursEnd);
        }
        if (updates.emergencyContactName !== undefined) {
            setClauses.push(`emergency_contact_name = $${paramIndex++}`);
            values.push(updates.emergencyContactName);
        }
        if (updates.emergencyContactPhone !== undefined) {
            setClauses.push(`emergency_contact_phone = $${paramIndex++}`);
            values.push(updates.emergencyContactPhone);
        }

        if (setClauses.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No valid fields to update'
            });
        }

        setClauses.push('updated_at = NOW()');

        const result = await query(
            `UPDATE user_preferences 
       SET ${setClauses.join(', ')}
       WHERE user_id = $1
       RETURNING *`,
            values
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({
            success: true,
            message: 'Preferences updated successfully'
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                error: 'Invalid parameters',
                details: error.errors
            });
        }
        logger.error('Error updating preferences:', error);
        res.status(500).json({ success: false, error: 'Failed to update preferences' });
    }
});

export default router;
