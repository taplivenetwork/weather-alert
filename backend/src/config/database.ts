import pg from 'pg';
import { logger } from './logger.js';

const { Pool } = pg;

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/weather_alert',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
    logger.error('Unexpected database error:', err);
});

export async function initializeDatabase(): Promise<void> {
    const client = await pool.connect();
    try {
        // Create tables if they don't exist
        await client.query(`
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        name VARCHAR(255),
        temperature_unit VARCHAR(5) DEFAULT 'F',
        wind_unit VARCHAR(10) DEFAULT 'mph',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- User preferences table
      CREATE TABLE IF NOT EXISTS user_preferences (
        user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        alert_info BOOLEAN DEFAULT true,
        alert_advisory BOOLEAN DEFAULT true,
        alert_warning BOOLEAN DEFAULT true,
        alert_emergency BOOLEAN DEFAULT true,
        notify_push BOOLEAN DEFAULT true,
        notify_sms BOOLEAN DEFAULT true,
        notify_email BOOLEAN DEFAULT true,
        quiet_hours_enabled BOOLEAN DEFAULT false,
        quiet_hours_start TIME,
        quiet_hours_end TIME,
        emergency_contact_name VARCHAR(255),
        emergency_contact_phone VARCHAR(20),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Weather alerts table
      CREATE TABLE IF NOT EXISTS weather_alerts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        order_id UUID,
        latitude DECIMAL(10,6) NOT NULL,
        longitude DECIMAL(10,6) NOT NULL,
        place_name VARCHAR(255),
        severity INTEGER CHECK (severity BETWEEN 1 AND 4) NOT NULL,
        weather_type VARCHAR(50) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        recommendation TEXT,
        valid_from TIMESTAMP,
        valid_until TIMESTAMP,
        delivered_at TIMESTAMP,
        acknowledged_at TIMESTAMP,
        feedback_rating INTEGER CHECK (feedback_rating BETWEEN 1 AND 5),
        feedback_text TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );

      -- Weather snapshots cache table
      CREATE TABLE IF NOT EXISTS weather_snapshots (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        latitude DECIMAL(10,6) NOT NULL,
        longitude DECIMAL(10,6) NOT NULL,
        weather_data JSONB NOT NULL,
        forecast_data JSONB,
        alerts_data JSONB,
        source VARCHAR(50) NOT NULL,
        fetched_at TIMESTAMP DEFAULT NOW()
      );

      -- Orders table (for weather scoring)
      CREATE TABLE IF NOT EXISTS orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        customer_id UUID REFERENCES users(id),
        provider_id UUID REFERENCES users(id),
        destination_lat DECIMAL(10,6),
        destination_lon DECIMAL(10,6),
        destination_name VARCHAR(255),
        scheduled_at TIMESTAMP,
        weather_score INTEGER,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Create indexes for performance
      CREATE INDEX IF NOT EXISTS idx_weather_snapshots_location 
        ON weather_snapshots(latitude, longitude);
      CREATE INDEX IF NOT EXISTS idx_weather_snapshots_fetched 
        ON weather_snapshots(fetched_at);
      CREATE INDEX IF NOT EXISTS idx_weather_alerts_user 
        ON weather_alerts(user_id);
      CREATE INDEX IF NOT EXISTS idx_weather_alerts_severity 
        ON weather_alerts(severity);
      CREATE INDEX IF NOT EXISTS idx_weather_alerts_created 
        ON weather_alerts(created_at);
      CREATE INDEX IF NOT EXISTS idx_orders_status 
        ON orders(status);
    `);

        logger.info('Database tables initialized successfully');
    } finally {
        client.release();
    }
}

export async function query(text: string, params?: unknown[]) {
    const start = Date.now();
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug('Executed query', { text, duration, rows: result.rowCount });
    return result;
}
