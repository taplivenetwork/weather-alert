import { useState } from 'react';

export default function Settings() {
    const [tempUnit, setTempUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
    const [activeSection, setActiveSection] = useState('general');
    const [extremeAlerts, setExtremeAlerts] = useState(true);
    const [severeWeather, setSevereWeather] = useState(true);
    const [generalAdvisories, setGeneralAdvisories] = useState(false);
    const [emailReports, setEmailReports] = useState(true);
    const [smsAlerts, setSmsAlerts] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [quietHours, setQuietHours] = useState(true);

    const locations = [
        { name: 'Home Office', location: 'San Francisco, CA', coords: '37.7749° N, 122.4194° W', active: true },
        { name: 'Mountain Cabin', location: 'Aspen, CO', coords: '39.1911° N, 106.8175° W', active: false },
        { name: 'Miami Marina', location: 'Miami, FL', coords: '25.7617° N, 80.1918° W', active: false },
    ];

    const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) => (
        <button
            onClick={() => onChange(!checked)}
            style={{
                width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: checked ? '#3b82f6' : '#334155',
                position: 'relative', transition: 'background 0.2s'
            }}
        >
            <span style={{
                position: 'absolute', top: '2px', left: checked ? '22px' : '2px',
                width: '20px', height: '20px', borderRadius: '50%', background: 'white',
                transition: 'left 0.2s'
            }}></span>
        </button>
    );

    return (
        <div style={{ minHeight: '100vh', background: '#0f1221' }}>
            {/* Top Navigation Bar */}
            <header style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', background: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '20px' }}>storm</span>
                        </div>
                        <span style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>SentinelWeather</span>
                    </div>

                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '8px 16px'
                    }}>
                        <span className="material-symbols-outlined" style={{ color: '#64748b', fontSize: '18px' }}>search</span>
                        <input
                            type="text" placeholder="Search safety zones..."
                            style={{ background: 'none', border: 'none', color: 'white', fontSize: '13px', width: '150px', outline: 'none' }}
                        />
                    </div>
                </div>

                <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <a href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Dashboard</a>
                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Live Map</a>
                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Forecast</a>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <span className="material-symbols-outlined" style={{ color: '#94a3b8', fontSize: '22px' }}>notifications</span>
                    </button>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>J</span>
                    </div>
                </nav>
            </header>

            <div style={{ display: 'flex', padding: '32px' }}>
                {/* Left Sidebar */}
                <aside style={{ width: '220px', marginRight: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'white', margin: '0 0 8px 0' }}>User Settings</h1>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 32px 0' }}>Manage your weather intelligence preferences, alerting thresholds, and notification delivery.</p>
                    </div>

                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <button
                            onClick={() => setActiveSection('general')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                                borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left',
                                background: activeSection === 'general' ? '#3b82f6' : 'transparent',
                                color: activeSection === 'general' ? 'white' : '#94a3b8', fontSize: '14px', fontWeight: 500
                            }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>settings</span>
                            General & Units
                        </button>
                        <button
                            onClick={() => setActiveSection('alerts')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                                borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left',
                                background: activeSection === 'alerts' ? '#3b82f6' : 'transparent',
                                color: activeSection === 'alerts' ? 'white' : '#94a3b8', fontSize: '14px'
                            }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>warning</span>
                            Alert Logic
                        </button>
                        <button
                            onClick={() => setActiveSection('delivery')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                                borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left',
                                background: activeSection === 'delivery' ? '#3b82f6' : 'transparent',
                                color: activeSection === 'delivery' ? 'white' : '#94a3b8', fontSize: '14px'
                            }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>campaign</span>
                            Delivery Channels
                        </button>
                        <button
                            onClick={() => setActiveSection('locations')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                                borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left',
                                background: activeSection === 'locations' ? '#3b82f6' : 'transparent',
                                color: activeSection === 'locations' ? 'white' : '#94a3b8', fontSize: '14px'
                            }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>location_on</span>
                            Saved Locations
                        </button>
                    </nav>

                    <button style={{
                        width: '100%', marginTop: '32px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        background: '#3b82f6', border: 'none', borderRadius: '10px',
                        padding: '14px', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer'
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>save</span>
                        Save Changes
                    </button>
                </aside>

                {/* Main Content */}
                <main style={{ flex: 1 }}>
                    {/* Measurement Units */}
                    <section style={{
                        background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px',
                        padding: '24px', marginBottom: '24px',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                            <span className="material-symbols-outlined" style={{ color: '#eab308', fontSize: '20px' }}>straighten</span>
                            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'white', margin: 0 }}>Measurement Units</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div>
                                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Temperature Scale</p>
                                <div style={{ display: 'flex', background: '#1e293b', borderRadius: '8px', padding: '4px' }}>
                                    <button
                                        onClick={() => setTempUnit('celsius')}
                                        style={{
                                            flex: 1, padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer',
                                            background: tempUnit === 'celsius' ? '#334155' : 'transparent',
                                            color: 'white', fontSize: '13px', fontWeight: 500
                                        }}
                                    >
                                        Celsius (°C)
                                    </button>
                                    <button
                                        onClick={() => setTempUnit('fahrenheit')}
                                        style={{
                                            flex: 1, padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer',
                                            background: tempUnit === 'fahrenheit' ? '#334155' : 'transparent',
                                            color: 'white', fontSize: '13px', fontWeight: 500
                                        }}
                                    >
                                        Fahrenheit (°F)
                                    </button>
                                </div>
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Wind Speed</p>
                                <select style={{
                                    width: '100%', padding: '12px 16px', background: '#1e293b', border: '1px solid #334155',
                                    borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none'
                                }}>
                                    <option>Kilometers per hour (km/h)</option>
                                    <option>Miles per hour (mph)</option>
                                    <option>Knots</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Alert Sensitivity */}
                    <section style={{
                        background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px',
                        padding: '24px', marginBottom: '24px',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                            <span className="material-symbols-outlined" style={{ color: '#3b82f6', fontSize: '20px' }}>sensors</span>
                            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'white', margin: 0 }}>Alert Sensitivity</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span className="material-symbols-outlined" style={{ color: '#ef4444', fontSize: '20px' }}>warning</span>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '14px', fontWeight: 500, color: 'white', margin: 0 }}>Extreme Alerts</p>
                                        <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>Tornadoes, severe floods, hurricane warnings.</p>
                                    </div>
                                </div>
                                <Toggle checked={extremeAlerts} onChange={setExtremeAlerts} />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(249, 115, 22, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span className="material-symbols-outlined" style={{ color: '#f97316', fontSize: '20px' }}>thunderstorm</span>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '14px', fontWeight: 500, color: 'white', margin: 0 }}>Severe Weather</p>
                                        <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>Lightning storms, high wind advisories.</p>
                                    </div>
                                </div>
                                <Toggle checked={severeWeather} onChange={setSevereWeather} />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span className="material-symbols-outlined" style={{ color: '#3b82f6', fontSize: '20px' }}>info</span>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '14px', fontWeight: 500, color: 'white', margin: 0 }}>General Advisories</p>
                                        <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>Rain onset, frost warnings, UV index spikes.</p>
                                    </div>
                                </div>
                                <Toggle checked={generalAdvisories} onChange={setGeneralAdvisories} />
                            </div>
                        </div>
                    </section>

                    {/* Notification Channels */}
                    <section style={{
                        background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px',
                        padding: '24px', marginBottom: '24px',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                            <span className="material-symbols-outlined" style={{ color: '#3b82f6', fontSize: '20px' }}>send</span>
                            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'white', margin: 0 }}>Notification Channels</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
                            <div style={{ background: '#1e293b', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                                <span className="material-symbols-outlined" style={{ color: '#94a3b8', fontSize: '28px', marginBottom: '8px', display: 'block' }}>mail</span>
                                <p style={{ fontSize: '13px', fontWeight: 500, color: 'white', margin: '0 0 12px 0' }}>Email Reports</p>
                                <Toggle checked={emailReports} onChange={setEmailReports} />
                            </div>
                            <div style={{ background: '#1e293b', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                                <span className="material-symbols-outlined" style={{ color: '#94a3b8', fontSize: '28px', marginBottom: '8px', display: 'block' }}>sms</span>
                                <p style={{ fontSize: '13px', fontWeight: 500, color: 'white', margin: '0 0 12px 0' }}>SMS Alerts</p>
                                <Toggle checked={smsAlerts} onChange={setSmsAlerts} />
                            </div>
                            <div style={{ background: '#1e293b', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                                <span className="material-symbols-outlined" style={{ color: '#94a3b8', fontSize: '28px', marginBottom: '8px', display: 'block' }}>notifications_active</span>
                                <p style={{ fontSize: '13px', fontWeight: 500, color: 'white', margin: '0 0 12px 0' }}>Push Notifications</p>
                                <Toggle checked={pushNotifications} onChange={setPushNotifications} />
                            </div>
                        </div>

                        {/* Quiet Hours */}
                        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <div>
                                    <p style={{ fontSize: '14px', fontWeight: 500, color: 'white', margin: 0 }}>Quiet Hours</p>
                                    <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>Disable non-emergency alerts during rest periods.</p>
                                </div>
                                <Toggle checked={quietHours} onChange={setQuietHours} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 6px 0' }}>From</p>
                                    <input type="text" defaultValue="10:00 PM" style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', fontSize: '13px' }} />
                                </div>
                                <div>
                                    <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 6px 0' }}>To</p>
                                    <input type="text" defaultValue="07:00 AM" style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', fontSize: '13px' }} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Monitored Locations */}
                    <section style={{
                        background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px',
                        padding: '24px',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className="material-symbols-outlined" style={{ color: '#3b82f6', fontSize: '20px' }}>location_on</span>
                                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'white', margin: 0 }}>Monitored Locations</h3>
                            </div>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#3b82f6', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
                                Add New
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {locations.map((loc, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#1e293b', borderRadius: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span className="material-symbols-outlined" style={{ color: '#3b82f6', fontSize: '20px' }}>home</span>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '14px', fontWeight: 500, color: 'white', margin: 0 }}>{loc.name}</p>
                                            <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>{loc.location} • {loc.coords}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        {loc.active && (
                                            <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>ACTIVE</span>
                                        )}
                                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                                            <span className="material-symbols-outlined" style={{ color: '#64748b', fontSize: '20px' }}>edit</span>
                                        </button>
                                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                                            <span className="material-symbols-outlined" style={{ color: '#64748b', fontSize: '20px' }}>delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
