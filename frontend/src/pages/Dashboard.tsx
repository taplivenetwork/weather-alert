import { useEffect, useState } from 'react';
import { useWeatherStore } from '../store/weatherStore';

export default function Dashboard() {
    const { currentWeather: weather, alerts, fetchWeather, currentLocation, setLocation } = useWeatherStore();
    const [showBanner, setShowBanner] = useState(true);

    useEffect(() => {
        if (!currentLocation) {
            setLocation(39.7392, -104.9903);
        }
    }, [currentLocation, setLocation]);

    const safetyScore = 85;
    const hasActiveWarning = alerts.some(a => a.severity >= 3);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0f1221' }}>
            {/* Sidebar */}
            <aside style={{
                width: '220px',
                background: '#0f1221',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                padding: '24px 16px'
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', paddingLeft: '8px' }}>
                    <div style={{ width: '32px', height: '32px', background: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '20px' }}>storm</span>
                    </div>
                    <div>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: 'white' }}>SentinelWeather</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>Safety Intelligence</div>
                    </div>
                </div>

                {/* Navigation */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <a href="/" style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                        borderRadius: '10px', background: 'rgba(59, 130, 246, 0.15)', color: 'white',
                        textDecoration: 'none', fontSize: '14px', fontWeight: 500
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>dashboard</span>
                        Dashboard
                    </a>
                    <a href="/alerts" style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                        borderRadius: '10px', color: '#94a3b8', textDecoration: 'none', fontSize: '14px'
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>notifications</span>
                        Alerts
                        <span style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', borderRadius: '10px', padding: '2px 8px', fontSize: '11px', fontWeight: 600 }}>3</span>
                    </a>
                    <a href="/settings" style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                        borderRadius: '10px', color: '#94a3b8', textDecoration: 'none', fontSize: '14px'
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>settings</span>
                        Settings
                    </a>
                    <a href="/admin" style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                        borderRadius: '10px', color: '#94a3b8', textDecoration: 'none', fontSize: '14px'
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>admin_panel_settings</span>
                        Admin
                    </a>
                </nav>

                {/* User Profile at bottom */}
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>AC</span>
                    </div>
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>Alex Chen</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>Safety Officer</div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Alert Banner */}
                {hasActiveWarning && showBanner && (
                    <div style={{
                        background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
                        padding: '12px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '20px' }}>warning</span>
                        <span style={{ color: 'white', fontSize: '14px', fontWeight: 500, flex: 1 }}>
                            High wind advisory in effect for your local area. Please exercise caution outdoors.
                        </span>
                        <button onClick={() => setShowBanner(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                            <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '20px' }}>close</span>
                        </button>
                    </div>
                )}

                {/* Content Area */}
                <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                        <div>
                            <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'white', margin: 0 }}>Dashboard Overview</h1>
                            <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>Real-time weather safety monitoring for Denver, CO</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span style={{ fontSize: '13px', color: '#64748b' }}>Last updated: 2 mins ago</span>
                            <button
                                onClick={() => currentLocation && fetchWeather(currentLocation.lat, currentLocation.lon)}
                                style={{
                                    background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px',
                                    padding: '10px 20px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '8px'
                                }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>refresh</span>
                                Update
                            </button>
                        </div>
                    </div>

                    {/* Top Row: Safety Score + Current Conditions */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px', marginBottom: '20px' }}>
                        {/* Safety Score Card */}
                        <div style={{
                            background: 'rgba(30, 41, 59, 0.5)',
                            borderRadius: '16px',
                            padding: '32px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}>
                            <p style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 24px 0' }}>
                                Outdoor Safety Score
                            </p>

                            {/* Circular Score */}
                            <div style={{ position: 'relative', width: '160px', height: '160px', marginBottom: '24px' }}>
                                <svg viewBox="0 0 160 160" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                    {/* Background circle */}
                                    <circle cx="80" cy="80" r="70" fill="none" stroke="#1e293b" strokeWidth="12" />
                                    {/* Progress circle */}
                                    <circle
                                        cx="80" cy="80" r="70" fill="none"
                                        stroke="#3b82f6" strokeWidth="12"
                                        strokeLinecap="round"
                                        strokeDasharray={`${2 * Math.PI * 70 * (safetyScore / 100)} ${2 * Math.PI * 70}`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))' }}
                                    />
                                </svg>
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: '48px', fontWeight: 700, color: 'white' }}>{safetyScore}</span>
                                    <span style={{ fontSize: '12px', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '2px' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>trending_up</span>
                                        +5%
                                    </span>
                                </div>
                            </div>

                            <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
                                Conditions are <span style={{ color: '#22c55e', fontWeight: 600 }}>Good</span> for
                            </p>
                            <p style={{ fontSize: '14px', color: '#94a3b8', margin: '2px 0 0 0' }}>outdoor activities</p>
                        </div>

                        {/* Current Conditions Card */}
                        <div style={{
                            background: 'rgba(30, 41, 59, 0.5)',
                            borderRadius: '16px',
                            padding: '32px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* Weather Icon */}
                            <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '64px', color: '#60a5fa' }}>partly_cloudy_day</span>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white', margin: 0 }}>Current Conditions</h3>
                                <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Denver International Airport Station</p>
                            </div>

                            <div style={{ margin: '32px 0' }}>
                                <span style={{ fontSize: '72px', fontWeight: 700, color: 'white', lineHeight: 1 }}>
                                    {weather?.temperature ?? 72}°
                                </span>
                                <span style={{ fontSize: '24px', color: '#64748b', marginLeft: '4px' }}>F</span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                <div>
                                    <p style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', margin: 0 }}>Wind Speed</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                                        <span className="material-symbols-outlined" style={{ color: '#60a5fa', fontSize: '20px' }}>air</span>
                                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>{weather?.windSpeed ?? 12} mph <span style={{ color: '#64748b', fontWeight: 400 }}>NW</span></span>
                                    </div>
                                </div>
                                <div>
                                    <p style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', margin: 0 }}>Humidity</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                                        <span className="material-symbols-outlined" style={{ color: '#60a5fa', fontSize: '20px' }}>humidity_percentage</span>
                                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>{weather?.humidity ?? 45}%</span>
                                    </div>
                                </div>
                                <div>
                                    <p style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', margin: 0 }}>Pressure</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                                        <span className="material-symbols-outlined" style={{ color: '#60a5fa', fontSize: '20px' }}>speed</span>
                                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>29.92 in</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Map + Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                        {/* Map Card */}
                        <div style={{
                            background: 'rgba(30, 41, 59, 0.5)',
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            position: 'relative',
                            overflow: 'hidden',
                            minHeight: '350px'
                        }}>
                            <img
                                src="/images/map_denver.png"
                                alt="Weather Map"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                            />

                            {/* Zoom Controls */}
                            <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <button style={{ width: '36px', height: '36px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                                </button>
                                <button style={{ width: '36px', height: '36px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>remove</span>
                                </button>
                            </div>

                            {/* Live Radar Badge */}
                            <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 2s infinite' }}></span>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: 'white', textTransform: 'uppercase' }}>Live Radar</span>
                            </div>

                            {/* Legend */}
                            <div style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></span>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'white' }}>Rain</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></span>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'white' }}>Storm</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {/* UV Index */}
                            <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(249, 115, 22, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#f97316', fontSize: '24px' }}>wb_sunny</span>
                                </div>
                                <p style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', margin: 0 }}>UV Index</p>
                                <p style={{ fontSize: '24px', fontWeight: 700, color: 'white', margin: '4px 0 0 0' }}>
                                    4 <span style={{ fontSize: '13px', fontWeight: 400, color: '#64748b' }}>Moderate</span>
                                </p>
                            </div>

                            {/* Visibility */}
                            <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#06b6d4', fontSize: '24px' }}>visibility</span>
                                </div>
                                <p style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', margin: 0 }}>Visibility</p>
                                <p style={{ fontSize: '24px', fontWeight: 700, color: 'white', margin: '4px 0 0 0' }}>
                                    10.0 <span style={{ fontSize: '13px', fontWeight: 400, color: '#64748b' }}>mi</span>
                                </p>
                            </div>

                            {/* Dew Point */}
                            <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#6366f1', fontSize: '24px' }}>water_drop</span>
                                </div>
                                <p style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', margin: 0 }}>Dew Point</p>
                                <p style={{ fontSize: '24px', fontWeight: 700, color: 'white', margin: '4px 0 0 0' }}>
                                    32° <span style={{ fontSize: '13px', fontWeight: 400, color: '#64748b' }}>F</span>
                                </p>
                            </div>

                            {/* Air Quality */}
                            <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(34, 197, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#22c55e', fontSize: '24px' }}>eco</span>
                                </div>
                                <p style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', margin: 0 }}>Air Quality</p>
                                <p style={{ fontSize: '24px', fontWeight: 700, color: 'white', margin: '4px 0 0 0' }}>
                                    28 <span style={{ fontSize: '13px', fontWeight: 400, color: '#64748b' }}>Good</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
