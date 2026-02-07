# SentinelWeather - Implementation Plan

## Project Overview

Building an MVP of SentinelWeather - an intelligent weather warning system for outdoor safety. This implementation focuses on **Phase 1 (Foundation)** and **Phase 2 (Alert System)** to deliver a functional prototype with core features.

## User Review Required

> [!IMPORTANT]
> **API Key Required**: You will need to obtain an OpenWeatherMap API key (free tier available at https://openweathermap.org/api). This should be set as `OPENWEATHERMAP_API_KEY` in the `.env` file.

> [!WARNING]  
> **Scope Limitation**: This MVP covers core weather data retrieval, alert generation, and notification UI. Route planning, ML-based predictions, and advanced GIS features will require additional phases.

---

## Proposed Changes

### Backend (Node.js + TypeScript + Express)

#### [NEW] `weather-alert-system/backend/package.json`
Project configuration with dependencies: Express, TypeScript, PostgreSQL (pg), Redis (ioredis), axios for API calls, node-cron for scheduled tasks, socket.io for real-time updates.

#### [NEW] `weather-alert-system/backend/src/index.ts`
Express server entry point with middleware setup, route mounting, and WebSocket initialization.

#### [NEW] `weather-alert-system/backend/src/config/database.ts`
PostgreSQL connection pool configuration and initialization.

#### [NEW] `weather-alert-system/backend/src/config/redis.ts`
Redis client configuration for weather data caching.

---

#### [NEW] `weather-alert-system/backend/src/models/`
Database models and TypeScript interfaces:
- `User.ts` - User preferences and notification settings
- `WeatherAlert.ts` - Alert records with severity, type, and status
- `WeatherSnapshot.ts` - Cached weather data points
- `Order.ts` - Order weather scores and associations

---

#### [NEW] `weather-alert-system/backend/src/services/`
Core business logic:
- `weatherDataService.ts` - OpenWeatherMap API integration with caching
- `alertGeneratorService.ts` - Context-aware alert generation with severity levels
- `notificationService.ts` - Multi-channel delivery (WebSocket, simulated SMS/email)
- `dispatchService.ts` - Weather score calculation for provider matching

---

#### [NEW] `weather-alert-system/backend/src/routes/`
REST API endpoints:
- `weatherRoutes.ts` - `GET /api/v1/weather/current`, `/forecast`, `/alerts`
- `userRoutes.ts` - `GET/PUT /api/v1/users/:id/preferences`
- `alertRoutes.ts` - `GET /api/v1/alerts`, `POST /api/v1/alerts/:id/acknowledge`
- `adminRoutes.ts` - `GET /api/v1/admin/dashboard`, `POST /api/v1/admin/alerts/broadcast`

---

#### [NEW] `weather-alert-system/backend/src/jobs/`
Background services:
- `weatherPollingJob.ts` - Scheduled weather data refresh (every 5 minutes)
- `alertMonitoringJob.ts` - Continuous severe weather monitoring

---

### Database Schema

#### [NEW] `weather-alert-system/backend/src/database/migrations/001_initial_schema.sql`
```sql
-- Users and preferences
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  temperature_unit VARCHAR(5) DEFAULT 'F',
  wind_unit VARCHAR(10) DEFAULT 'mph',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  alert_info BOOLEAN DEFAULT true,
  alert_advisory BOOLEAN DEFAULT true,
  alert_warning BOOLEAN DEFAULT true,
  alert_emergency BOOLEAN DEFAULT true,
  notify_push BOOLEAN DEFAULT true,
  notify_sms BOOLEAN DEFAULT true,
  notify_email BOOLEAN DEFAULT true,
  quiet_hours_start TIME,
  quiet_hours_end TIME
);

-- Weather alerts
CREATE TABLE weather_alerts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  order_id UUID,
  latitude DECIMAL(10,6),
  longitude DECIMAL(10,6),
  place_name VARCHAR(255),
  severity INTEGER CHECK (severity BETWEEN 1 AND 4),
  weather_type VARCHAR(50),
  title VARCHAR(255),
  description TEXT,
  recommendation TEXT,
  valid_from TIMESTAMP,
  valid_until TIMESTAMP,
  acknowledged_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Weather cache
CREATE TABLE weather_snapshots (
  id UUID PRIMARY KEY,
  latitude DECIMAL(10,6),
  longitude DECIMAL(10,6),
  weather_data JSONB,
  source VARCHAR(50),
  fetched_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_weather_snapshots_location ON weather_snapshots(latitude, longitude);
CREATE INDEX idx_weather_alerts_user ON weather_alerts(user_id);
CREATE INDEX idx_weather_alerts_severity ON weather_alerts(severity);
```

---

### Frontend (React + TypeScript + Vite)

#### [NEW] `weather-alert-system/frontend/package.json`
React project with Vite, React Router, Zustand for state, Axios, Socket.io-client, Recharts for visualizations.

#### [NEW] `weather-alert-system/frontend/src/App.tsx`
Main application with routing: Dashboard, Alerts, Settings, Admin.

---

#### [NEW] `weather-alert-system/frontend/src/pages/`
Main views:
- `Dashboard.tsx` - Weather overview with current conditions and map
- `Alerts.tsx` - Alert history with acknowledgment and feedback
- `Settings.tsx` - User preferences for units and notification channels
- `AdminDashboard.tsx` - Admin monitoring panel

---

#### [NEW] `weather-alert-system/frontend/src/components/`
Reusable UI components:
- `WeatherCard.tsx` - Current conditions display
- `ForecastChart.tsx` - Hourly/daily forecast graph
- `AlertBanner.tsx` - Severity-colored alert notifications
- `WeatherMap.tsx` - Interactive map with weather overlay
- `NotificationCenter.tsx` - Real-time alert popups

---

#### [NEW] `weather-alert-system/frontend/src/styles/`
Premium UI styling:
- `index.css` - Design system with dark mode, gradients, glassmorphism effects
- Component-specific styles with animations

---

### Project Configuration

#### [NEW] `weather-alert-system/.env.example`
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/weather_alert

# Redis
REDIS_URL=redis://localhost:6379

# Weather API
OPENWEATHERMAP_API_KEY=your_api_key_here

# Server
PORT=3001
NODE_ENV=development
```

#### [NEW] `weather-alert-system/docker-compose.yml`
Development environment with PostgreSQL, Redis containers.

#### [NEW] `weather-alert-system/README.md`
Complete setup instructions, API documentation, and architecture overview.

---

## Verification Plan

### Automated Tests

#### Backend Unit Tests
Run with: `cd weather-alert-system/backend && npm test`

Tests to implement:
1. **Weather Service Tests** - Mock OpenWeatherMap API, verify data parsing and caching
2. **Alert Generator Tests** - Verify severity calculation based on weather conditions
3. **Notification Service Tests** - Verify channel selection based on preferences

#### API Integration Tests
Run with: `cd weather-alert-system/backend && npm run test:integration`

1. Test all REST endpoints return expected responses
2. Test WebSocket connection and real-time alerts

---

### Manual Verification

#### 1. Weather Data Retrieval
1. Start the backend server: `cd weather-alert-system/backend && npm run dev`
2. Open browser to `http://localhost:3001/api/v1/weather/current?lat=40.7128&lon=-74.0060`
3. **Expected**: JSON response with current weather for New York City

#### 2. Frontend Dashboard
1. Start frontend: `cd weather-alert-system/frontend && npm run dev`
2. Open `http://localhost:5173`
3. **Expected**: Weather dashboard loads with current conditions displayed

#### 3. Alert Generation
1. Open Admin Dashboard in the frontend
2. Click "Generate Test Alert" for a specific location
3. **Expected**: Alert appears in Notifications panel with correct severity color

#### 4. Real-time Notifications
1. Open two browser tabs with the dashboard
2. Trigger an alert from Admin panel
3. **Expected**: Both tabs receive the alert via WebSocket simultaneously

#### 5. User Preference Persistence
1. Navigate to Settings page
2. Change temperature unit to Celsius
3. Refresh the page
4. **Expected**: Setting persists and weather displays in Celsius

---

## Tech Stack Summary

| Layer | Technology |
|-------|------------|
| Backend | Node.js + TypeScript + Express |
| Database | PostgreSQL 15 |
| Cache | Redis 7 |
| Real-time | Socket.io |
| Frontend | React 18 + TypeScript + Vite |
| Styling | Vanilla CSS with modern design |
| Weather API | OpenWeatherMap |
| Containerization | Docker Compose |

---

## Project Structure

```
weather-alert-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── database/migrations/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── jobs/
│   │   └── index.ts
│   ├── tests/
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Notes

- **MVP Scope**: This plan covers core functionality. Route planning, ML predictions, and advanced GIS integration are Phase 2+ items.
- **API Costs**: OpenWeatherMap free tier allows 1,000 calls/day - sufficient for development.
- **Database**: PostgreSQL with JSONB for flexible weather data storage.
- **Real-time**: WebSocket for instant alert delivery to connected clients.
