import { useState } from 'react';

interface AlertData {
    id: string;
    severity: 'emergency' | 'warning' | 'advisory';
    location: string;
    title: string;
    description: string;
    recommendation: string;
    time: string;
    image: string;
}

export default function Alerts() {
    const [activeFilter, setActiveFilter] = useState('all');

    const mockAlerts: AlertData[] = [
        {
            id: '1',
            severity: 'emergency',
            location: 'SECTOR 7G',
            title: 'Severe Thunderstorm & Tornado Watch',
            description: 'A massive convective system is moving East-North-East at 45mph. Winds gusting up to 75mph detected. Large hail and significant debris damage reported in neighboring sectors.',
            recommendation: 'Seek Shelter Immediately',
            time: '12 mins ago',
            image: '/images/radar_storm.png'
        },
        {
            id: '2',
            severity: 'warning',
            location: 'COASTAL AREA',
            title: 'Flash Flood Warning',
            description: 'Excessive rainfall of 3-5 inches has occurred. Low-lying areas and urban drainage systems are likely to exceed capacity within the next 60 minutes.',
            recommendation: 'Avoid Travel Near Waterways',
            time: '28 mins ago',
            image: '/images/radar_flood.png'
        },
        {
            id: '3',
            severity: 'advisory',
            location: 'HIGHLAND PASS',
            title: 'Dense Fog Advisory',
            description: 'Visibility reduced to less than 1/4 mile in certain areas. Driving conditions are hazardous. Use low-beam headlights and maintain safe following distances.',
            recommendation: 'Exercise High Caution on Roadways',
            time: '1 hr ago',
            image: '/images/radar_fog.png'
        }
    ];


    const getSeverityStyles = (severity: string) => {
        switch (severity) {
            case 'emergency':
                return { border: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444', badge: '#ef4444' };
            case 'warning':
                return { border: '#f97316', bg: 'rgba(249, 115, 22, 0.1)', text: '#f97316', badge: '#f97316' };
            case 'advisory':
                return { border: '#eab308', bg: 'rgba(234, 179, 8, 0.1)', text: '#eab308', badge: '#eab308' };
            default:
                return { border: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6', badge: '#3b82f6' };
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#0f1221' }}>
            {/* Top Navigation Bar */}
            <header style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 32px',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', background: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '20px' }}>storm</span>
                        </div>
                        <span style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>SentinelWeather</span>
                    </div>

                    {/* Nav Links */}
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <a href="/" style={{ padding: '8px 16px', color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Dashboard</a>
                        <a href="/alerts" style={{ padding: '8px 16px', color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 600, borderBottom: '2px solid white' }}>Alerts</a>
                        <a href="#" style={{ padding: '8px 16px', color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Radar Map</a>
                        <a href="#" style={{ padding: '8px 16px', color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Historical Data</a>
                    </nav>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* Search */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '8px 16px'
                    }}>
                        <span className="material-symbols-outlined" style={{ color: '#64748b', fontSize: '18px' }}>search</span>
                        <input
                            type="text"
                            placeholder="Search by region or alert type"
                            style={{ background: 'none', border: 'none', color: 'white', fontSize: '13px', width: '180px', outline: 'none' }}
                        />
                    </div>

                    {/* Notification & Profile */}
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
                        <span className="material-symbols-outlined" style={{ color: '#94a3b8', fontSize: '22px' }}>notifications</span>
                    </button>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '20px' }}>person</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main style={{ padding: '32px' }}>
                {/* Page Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'white', margin: 0 }}>Active Weather Alerts</h1>
                        <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>7 active threats identified in your monitoring zones</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px', padding: '10px 16px', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer'
                        }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
                            Export Report
                        </button>
                        <button style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            background: '#3b82f6', border: 'none',
                            borderRadius: '8px', padding: '10px 16px', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer'
                        }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>settings</span>
                            Alert Config
                        </button>
                    </div>
                </div>

                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>EMERGENCY</span>
                            <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>CRITICAL</span>
                        </div>
                        <p style={{ fontSize: '32px', fontWeight: 700, color: 'white', margin: '8px 0 0 0' }}>
                            2 <span style={{ fontSize: '13px', color: '#ef4444', fontWeight: 500 }}>+1 new</span>
                        </p>
                    </div>
                    <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>WARNING</span>
                            <span style={{ background: 'rgba(249, 115, 22, 0.2)', color: '#f97316', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>URGENT</span>
                        </div>
                        <p style={{ fontSize: '32px', fontWeight: 700, color: 'white', margin: '8px 0 0 0' }}>
                            5 <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Stable</span>
                        </p>
                    </div>
                    <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>ADVISORY</span>
                            <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>INFORM</span>
                        </div>
                        <p style={{ fontSize: '32px', fontWeight: 700, color: 'white', margin: '8px 0 0 0' }}>
                            12 <span style={{ fontSize: '13px', color: '#22c55e', fontWeight: 500 }}>-2 resolved</span>
                        </p>
                    </div>
                </div>

                {/* Filters + Content */}
                <div style={{ display: 'flex', gap: '32px' }}>
                    {/* Left: Filters + Alerts */}
                    <div style={{ flex: 1 }}>
                        {/* Filter Pills */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                            <button
                                onClick={() => setActiveFilter('all')}
                                style={{
                                    padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                                    background: activeFilter === 'all' ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                                    color: 'white', fontSize: '13px', fontWeight: 500,
                                    display: 'flex', alignItems: 'center', gap: '6px'
                                }}
                            >
                                All Alerts <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '10px', fontSize: '11px' }}>19</span>
                            </button>
                            <button
                                onClick={() => setActiveFilter('emergency')}
                                style={{
                                    padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                                    background: activeFilter === 'emergency' ? '#ef4444' : 'rgba(255,255,255,0.05)',
                                    color: 'white', fontSize: '13px', fontWeight: 500,
                                    display: 'flex', alignItems: 'center', gap: '6px'
                                }}
                            >
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
                                Emergency
                            </button>
                            <button
                                onClick={() => setActiveFilter('warning')}
                                style={{
                                    padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                                    background: activeFilter === 'warning' ? '#f97316' : 'rgba(255,255,255,0.05)',
                                    color: 'white', fontSize: '13px', fontWeight: 500,
                                    display: 'flex', alignItems: 'center', gap: '6px'
                                }}
                            >
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316' }}></span>
                                Warning
                            </button>
                            <button
                                onClick={() => setActiveFilter('advisory')}
                                style={{
                                    padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                                    background: activeFilter === 'advisory' ? '#eab308' : 'rgba(255,255,255,0.05)',
                                    color: 'white', fontSize: '13px', fontWeight: 500,
                                    display: 'flex', alignItems: 'center', gap: '6px'
                                }}
                            >
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }}></span>
                                Advisory
                            </button>

                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>schedule</span>
                                Last updated: 14:02 PM
                            </div>
                        </div>

                        {/* Alert Cards */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {mockAlerts.map((alert) => {
                                const styles = getSeverityStyles(alert.severity);
                                return (
                                    <div key={alert.id} style={{
                                        background: 'rgba(30, 41, 59, 0.5)',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        borderLeft: `4px solid ${styles.border}`,
                                        overflow: 'hidden',
                                        display: 'flex'
                                    }}>
                                        {/* Image */}
                                        <div style={{ width: '200px', minHeight: '180px', position: 'relative', flexShrink: 0 }}>
                                            <img
                                                src={alert.image}
                                                alt="Radar"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x180/1e293b/3b82f6?text=Radar';
                                                }}
                                            />
                                            <div style={{
                                                position: 'absolute', top: '12px', left: '12px',
                                                background: 'rgba(0,0,0,0.7)', borderRadius: '6px', padding: '4px 8px',
                                                display: 'flex', alignItems: 'center', gap: '4px'
                                            }}>
                                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }}></span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, color: 'white' }}>LIVE RADAR</span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div style={{ flex: 1, padding: '20px 24px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                                        <span style={{
                                                            color: styles.text,
                                                            fontSize: '11px',
                                                            fontWeight: 700,
                                                            textTransform: 'uppercase',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '4px'
                                                        }}>
                                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: styles.badge }}></span>
                                                            {alert.severity} • {alert.location}
                                                        </span>
                                                    </div>
                                                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white', margin: 0 }}>{alert.title}</h3>
                                                </div>
                                                <span style={{ fontSize: '12px', color: '#64748b' }}>{alert.time}</span>
                                            </div>

                                            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '12px 0', lineHeight: 1.5 }}>
                                                {alert.description}
                                            </p>

                                            <div style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                background: styles.bg, borderRadius: '6px', padding: '6px 12px',
                                                marginBottom: '16px'
                                            }}>
                                                <span style={{
                                                    width: '6px', height: '6px', borderRadius: '50%',
                                                    background: styles.badge
                                                }}></span>
                                                <span style={{ fontSize: '12px', fontWeight: 600, color: styles.text }}>
                                                    {alert.severity === 'emergency' ? 'Safety Recommendation' : alert.severity === 'warning' ? 'Recommendation' : 'Action'}: {alert.recommendation}
                                                </span>
                                            </div>

                                            <div style={{ display: 'flex', gap: '12px' }}>
                                                <button style={{
                                                    display: 'flex', alignItems: 'center', gap: '6px',
                                                    background: '#3b82f6', border: 'none', borderRadius: '8px',
                                                    padding: '8px 16px', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer'
                                                }}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check_circle</span>
                                                    Acknowledge
                                                </button>
                                                <button style={{
                                                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
                                                    padding: '8px 16px', color: 'white', fontSize: '13px', fontWeight: 500, cursor: 'pointer'
                                                }}>
                                                    Dismiss Alert
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Regional Overview */}
                    <div style={{ width: '280px', flexShrink: 0 }}>
                        <div style={{
                            background: 'rgba(30, 41, 59, 0.5)',
                            borderRadius: '16px',
                            padding: '20px',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                                <span className="material-symbols-outlined" style={{ color: '#3b82f6', fontSize: '20px' }}>map</span>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>REGIONAL OVERVIEW</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '13px', color: '#94a3b8' }}>North Sector</span>
                                    </div>
                                    <div style={{ height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ width: '80%', height: '100%', background: '#ef4444', borderRadius: '3px' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '13px', color: '#94a3b8' }}>South Sector</span>
                                    </div>
                                    <div style={{ height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ width: '30%', height: '100%', background: '#22c55e', borderRadius: '3px' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '13px', color: '#94a3b8' }}>Coastal Area</span>
                                    </div>
                                    <div style={{ height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ width: '60%', height: '100%', background: '#f97316', borderRadius: '3px' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button style={{
                            width: '100%', marginTop: '16px',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px',
                            padding: '16px 20px', color: 'white', fontSize: '14px', fontWeight: 500, cursor: 'pointer'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#94a3b8' }}>support_agent</span>
                                Contact Dispatch
                            </div>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#64748b' }}>chevron_right</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
