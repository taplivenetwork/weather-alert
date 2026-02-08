# ⚡ SentinelWeather - Intelligent Weather Warning System

A comprehensive real-time weather monitoring and early warning system providing AI-powered graded alerts for outdoor activities and safety-critical operations.

> **Carefully crafted to ensure the safety of outdoor enthusiasts.**

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

## 📸 Application Pages

> **Total Pages: 9** | Run `npm run dev` in the frontend folder and visit `http://localhost:5173/`

### 🗺️ Complete Route Map

| Route | Page | Category | Description |
|-------|------|----------|-------------|
| `/` | Landing Page | Core | Marketing homepage with hero, use cases, and pricing |
| `/dashboard` | Dashboard | Core | Main control center with safety score and weather data |
| `/alerts` | Alerts | Core | Real-time alert management with severity filtering |
| `/settings` | Settings | Core | User preferences and notification configuration |
| `/admin` | Admin Dashboard | Core | Operations command center for system management |
| `/health` | Health Dashboard | Advanced | Biometric monitoring with AI safety recommendations |
| `/team` | Team Tracker | Advanced | Expedition team coordination with live vitals |
| `/route` | Route Planner | Advanced | Weather-integrated route planning with waypoints |
| `/maritime` | Maritime Safety | Advanced | Nautical navigation with tide and sea state data |

---

### 🏠 Core Features

#### Landing Page (`/`)
The marketing page introduces SentinelWeather with a stunning hero section, 3-step process explanation, use cases, and pricing plans.

![Landing Page](docs/screenshots/landing.png)

#### Dashboard (`/dashboard`)
The main control center featuring a Safety Score dial (0-100), current weather conditions, live radar map, and key metrics (UV Index, Visibility, Dew Point, Air Quality).

![Dashboard](docs/screenshots/dashboard.png)

#### Alerts (`/alerts`)
Real-time alert management with severity-based filtering (Emergency, Warning, Advisory), live radar previews, and a regional overview sidebar.

![Alerts](docs/screenshots/alerts.png)

#### Settings (`/settings`)
User preferences including measurement units, alert sensitivity toggles, notification channels, quiet hours, and monitored locations management.

![Settings](docs/screenshots/settings.png)

#### Admin Dashboard (`/admin`)
Operations command center with system health stats, alert frequency charts, emergency broadcast controls, and comprehensive alert history logs.

![Admin Dashboard](docs/screenshots/admin.png)

---

### 🚀 Advanced Features (Demo MVP)

#### Health Dashboard (`/health`)
**Biometric Health Monitoring** - Real-time physiological telemetry with wearable device integration.

- ❤️ **Heart Rate Gauge** - Circular SVG gauge with neon green glow effect
- 🫁 **SpO2 Level** - Blood oxygen saturation monitoring
- 🌡️ **Core Temperature** - Body temperature with normal range indicator
- 🧠 **Stress Meter** - Gradient-based physiological stress visualization
- 😴 **Sleep Analysis** - Deep/REM sleep breakdown with percentages
- ⚡ **Recovery Score** - Overall readiness indicator (0-100%)
- 🤖 **AI Safety Banner** - Context-aware recommendations based on conditions

> *Design: Space Grotesk font, glassmorphism cards, neon green (#0df20d) accent theme*

#### Team Tracker (`/team`)
**Expedition Coordination** - Multi-person tracking with real-time team location, distance, and direction. Location data (including movement trajectory and corresponding timestamps) along with time information is simultaneously saved and uploaded to a remote server. This helps in handling and predicting emergencies — if someone gets lost, rescue personnel can roughly pinpoint their location based on historical tracking data.

- 🗺️ **Topographic Map** - SVG-based terrain visualization with contour lines
- 📍 **Team Markers** - Clickable avatars with status indicators (pulsing for leader)
- 💓 **Vitals Grid** - 4-column display (HR, O2, Altitude, Battery) per member
- ⚠️ **Critical Alerts** - Red-highlighted cards for members in danger
- 🚨 **Emergency SOS** - One-tap satellite distress signal activation
- 📡 **Live Uplink** - Real-time sync status with team coordination server

> *Design: Dark expedition theme with green (#0df20d) and red (#ff4d4d) status indicators*

#### Route Planner (`/route`)
**Weather-Integrated Planning** - Intelligent route analysis with hazard prediction.

- 🛤️ **Waypoint Timeline** - Vertical gradient line connecting route points
- ⛅ **Weather Forecast** - Predicted conditions at each waypoint arrival time
- 📊 **Elevation Chart** - SVG profile with danger zone overlay
- 🎯 **Safety Scores** - Color-coded risk assessment per segment
- 🎒 **Gear Checklist** - AI-generated equipment recommendations
- 🤖 **AI Protocol** - Safety recommendations based on route analysis

> *Design: Blue (#0d7ff2) accent theme with gradient safety indicators*

#### Maritime Dashboard (`/maritime`)
**Nautical Safety & Navigation** - Comprehensive marine monitoring system.

- 🧭 **Nautical Chart** - Grid overlay with bathymetry gradient background
- 🚢 **AIS Markers** - Ship icons with hover tooltips (SOG, COG, CPA)
- ⚠️ **Reef Hazards** - Pulsing warning circles for shallow areas
- 🌊 **Tide Panel** - SVG tide graph with high/low predictions
- 💨 **Sea State** - Beaufort scale indicator with swell/wind data
- 📏 **Depth Sounder** - Real-time sonar profile visualization
- 📡 **Collision Radar** - AI-powered proximity warning system
- 🆘 **EPIRB Button** - Emergency Position Indicating Radio Beacon

> *Design: Maritime blue theme with glassmorphism panels and scanline effects*

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

## 🗺 Roadmap

> 📖 See [Advanced Features Roadmap](docs/ADVANCED_FEATURES_ROADMAP.md) for detailed specifications.

### Phase 1: Core Platform (Current)
- [x] **Weather Data Integration** - Multi-source weather API with real-time alerts
- [x] **Graded Alert System** - 4-tier severity levels with actionable recommendations
- [x] **Dashboard & UI** - Real-time monitoring with safety score visualization
- [x] **Admin Controls** - System health, analytics, and emergency broadcast

### Phase 2: Enhanced Environmental Intelligence
- [ ] **Extended Weather Parameters** - UV index, air quality, visibility, atmospheric pressure
- [ ] **Route Planning** - AI-calculated travel routes with weather risk analysis
- [ ] **Time-based Predictions** - Weather conditions at specific future times along routes
- [ ] **GIS Integration** - Terrain analysis, campsite safety, hazard mapping

### Phase 3: Biometric Health Monitoring
- [ ] **Smart Wearable Integration** - Apple Watch, Garmin, Fitbit, Xiaomi via Bluetooth
- [ ] **Vital Signs Monitoring** - Heart rate, SpO2, body temperature, blood pressure
- [ ] **Advanced Health Metrics** - HRV, stress levels, VO2max, body energy score
- [ ] **Sleep Quality Analysis** - Recovery scoring for multi-day expeditions
- [ ] **Women's Health Features** - Temperature tracking, cycle prediction

### Phase 4: AI-Powered Safety Intelligence
- [ ] **Unified Decision Engine** - Weather + Health + Terrain AI analysis
- [ ] **Graded Safety Recommendations** - Continue/Rest/Stop/Shelter/Evacuate/Medical
- [ ] **Predictive Risk Assessment** - Pre-trip safety analysis with gear checklists
- [ ] **Explainable AI** - Clear reasoning for all safety decisions

### Phase 5: Team Coordination & Emergency Response
- [ ] **Multi-Person Tracking** - Real-time team location, distance, bearing
- [ ] **Signal Coverage Mapping** - Cell tower and satellite signal prediction
- [ ] **Command Center Integration** - Authorized monitoring for expedition teams
- [ ] **Emergency Power-Saving Mode** - Critical battery survival mode
- [ ] **Voice Recording & AI Safety Monitor** - Distress detection for team safety

### Phase 6: Maritime & Aquatic Safety (Optional)
- [ ] **Maritime Positioning** - GPS, BeiDou, AIS, satellite phone integration
- [ ] **Anti-Collision System** - Ship-to-ship, ship-to-reef warnings
- [ ] **Marine Equipment Integration** - Depth sounder, sonar, echo sounder
- [ ] **Sea Conditions Alerts** - Wave height, tidal information, marine fog

### Platform Expansion
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
