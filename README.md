# ⚡ SentinelWeather - Intelligent Weather Warning System

A comprehensive real-time weather monitoring and early warning system providing AI-powered graded alerts for outdoor activities and safety-critical operations.

> **Carefully crafted, dedicated to those who need safety protection.**

---

## 🌍 Who Is This For?

SentinelWeather serves as an intelligent risk control layer for anyone exposed to weather-related hazards:

| Use Case | Example Applications |
|----------|---------------------|
| 🏔️ **Outdoor Adventures** | Mountaineering, hiking, camping, extreme sports |
| � **Field Operations** | Remote area inspections, geological surveys |
| ⚡ **Industrial Safety** | High-voltage power grid inspections, wind turbine maintenance |
| 🚂 **Infrastructure** | Railway construction, bridge building in exposed areas |
| 🌾 **Agriculture** | Drought warnings, frost alerts for crop protection |
| 🎯 **Tourism** | Tour operators, outdoor event organizers |

## 🚨 What Makes This Different?

**This is NOT a weather forecast system.** Traditional weather apps tell you what the weather *will be*. SentinelWeather tells you what the weather *means for your safety*.

### Key Differentiators

| Feature | Traditional Weather Apps | SentinelWeather |
|---------|-------------------------|-----------------|
| **Purpose** | Information display | Risk assessment & action recommendations |
| **Alerts** | Generic notifications | AI-analyzed, graded severity alerts |
| **Focus** | General conditions | Activity-specific hazard warnings |
| **Response** | Passive viewing | Active safety interventions |

### Hazard Categories Monitored

- 🌪️ **Severe Storms** - Thunderstorms, lightning activity, tornadoes
- ❄️ **Winter Hazards** - Blizzards, snowstorms, avalanche conditions
- 🌡️ **Temperature Extremes** - Dangerous heat/cold, sudden temperature drops
- 💧 **Water Hazards** - Flash floods, mudslides, heavy precipitation
- 🧊 **Precipitation** - Hail, freezing rain, ice storms
- 🌱 **Agricultural** - Drought conditions, frost warnings
- 💨 **Wind Events** - High winds, dust storms

---

## 🏗️ Architecture

SentinelWeather can operate as:
1. **Standalone Web Application** - Full-featured dashboard for monitoring and alerts
2. **API Integration** - RESTful API + WebSocket for embedding into your platforms
3. **Alert Service** - Push notifications to your existing systems

```
┌─────────────────────────────────────────────────────────────────┐
│                    SentinelWeather Platform                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│  │   Dashboard   │  │  Alert API    │  │  WebSocket    │       │
│  │   (React)     │  │  (REST)       │  │  (Real-time)  │       │
│  └───────────────┘  └───────────────┘  └───────────────┘       │
├─────────────────────────────────────────────────────────────────┤
│                    AI Analysis Engine                            │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Weather Data → Risk Assessment → Severity Grading → Alert  ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐   │
│  │  Weather  │  │  Cache    │  │  Database │  │  GIS Data │   │
│  │  Provider │  │  (Redis)  │  │  (PgSQL)  │  │  Location │   │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📸 Screenshots

### Landing Page
The marketing page introduces SentinelWeather with a stunning hero section, 3-step process explanation, use cases, and pricing plans.

### Dashboard
The main control center featuring a Safety Score dial (0-100), current weather conditions, live radar map, and key metrics (UV Index, Visibility, Dew Point, Air Quality).

### Alerts
Real-time alert management with severity-based filtering (Emergency, Warning, Advisory), live radar previews, and a regional overview sidebar.

### Settings
User preferences including measurement units, alert sensitivity toggles, notification channels, quiet hours, and monitored locations management.

### Admin Dashboard
Operations command center with system health stats, alert frequency charts (Recharts), emergency broadcast controls, and comprehensive alert history logs.

---

## 🎨 Alert Severity System

Our 4-tier graded alert system provides clear, actionable guidance:

| Level | Type | Icon | Description | Recommended Action |
|-------|------|------|-------------|-------------------|
| **1** | Informational | 🟢 | Minor weather changes | Continue with awareness |
| **2** | Advisory | 🟡 | Moderate conditions developing | Review plans, prepare contingencies |
| **3** | Warning | 🟠 | Severe conditions expected | Postpone activities, seek shelter |
| **4** | Emergency | 🔴 | Life-threatening conditions | Immediate protective action required |

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 20+ with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Real-time**: Socket.io
- **Weather API**: OpenWeatherMap

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **State Management**: Zustand
- **Routing**: React Router 6
- **Styling**: Custom CSS Design System

---

## 📁 Project Structure

```
weather-alert-system/
├── backend/
│   ├── src/
│   │   ├── config/         # Database, Redis, Logger config
│   │   ├── models/         # TypeScript types
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic & AI analysis
│   │   ├── jobs/           # Background monitoring jobs
│   │   └── index.ts        # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages
│   │   ├── store/          # Zustand state management
│   │   ├── styles/         # CSS design system
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- OpenWeatherMap API key (free at https://openweathermap.org/api)

### 1. Clone & Setup

```bash
cd weather-alert-system

# Start PostgreSQL and Redis
docker-compose up -d postgres redis
```

### 2. Configure Environment

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env and add your OPENWEATHERMAP_API_KEY
```

### 3. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Start Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 5. Open the App

Visit http://localhost:5173 in your browser.

---

## 📡 API Reference

### Weather Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/weather/current?lat=&lon=` | Current weather conditions |
| `GET` | `/api/v1/weather/forecast?lat=&lon=` | Multi-day forecast |
| `GET` | `/api/v1/weather/score?lat=&lon=` | Safety score for location |

### Alert Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/alerts?userId=` | Get user's active alerts |
| `POST` | `/api/v1/alerts/check` | Trigger weather analysis & alert check |
| `POST` | `/api/v1/alerts/:id/acknowledge` | Acknowledge receipt of alert |
| `POST` | `/api/v1/alerts/:id/feedback` | Submit feedback on alert accuracy |

### User Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/users` | Create user profile |
| `GET` | `/api/v1/users/:id` | Get user settings |
| `PUT` | `/api/v1/users/:id/preferences` | Update notification preferences |

### Admin Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/admin/dashboard` | System health & statistics |
| `POST` | `/api/v1/admin/alerts/broadcast` | Broadcast emergency alert |
| `GET` | `/api/v1/admin/analytics/weather-impact` | Weather impact analytics |

---

## ⚡ WebSocket Events

### Client → Server
| Event | Payload | Description |
|-------|---------|-------------|
| `identify` | `userId` | Associate connection with user |
| `subscribe_location` | `{lat, lon}` | Subscribe to location alerts |

### Server → Client
| Event | Payload | Description |
|-------|---------|-------------|
| `weather_alert` | Alert object | New graded weather alert |
| `weather_update` | Weather data | Real-time weather update |

---

## 🐳 Docker Deployment

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## � Roadmap

- [ ] **Route Planning** - AI-calculated travel routes with weather risk analysis
- [ ] **Time-based Predictions** - Weather conditions at specific future times
- [ ] **GIS Integration** - Geographical location information system support
- [ ] **Mobile Apps** - Native iOS and Android applications
- [ ] **SMS/Voice Alerts** - Alternative notification channels
- [ ] **Offline Mode** - Cached alerts for areas with poor connectivity

---

## 📜 License

MIT License

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

---

<div align="center">

**Built with ❤️ for safety and protection of those who venture outdoors**

*SentinelWeather - Because Weather Awareness Saves Lives*

</div>
