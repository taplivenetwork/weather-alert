import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function AdminDashboard() {
    const [timeRange, setTimeRange] = useState('24H');

    const chartData = [
        { time: '00:00', emergency: 1, warning: 3, advisory: 8 },
        { time: '04:00', emergency: 0, warning: 5, advisory: 6 },
        { time: '08:00', emergency: 2, warning: 4, advisory: 10 },
        { time: '12:00', emergency: 1, warning: 8, advisory: 12 },
        { time: '16:00', emergency: 3, warning: 6, advisory: 9 },
        { time: '20:00', emergency: 1, warning: 7, advisory: 11 },
    ];

    const alertHistory = [
        { timestamp: '2023-10-27 14:22:05', type: 'Tornado Watch', severity: 'CRITICAL', region: 'Oklahoma City, OK', source: 'NWS Doppler', status: 'Broadcasted' },
        { timestamp: '2023-10-27 13:58:41', type: 'Flash Flood Advisory', severity: 'WARNING', region: 'Austin, TX', source: 'Satellite-A12', status: 'Broadcasted' },
        { timestamp: '2023-10-27 13:45:12', type: 'High Wind Warning', severity: 'ADVISORY', region: 'Portland, OR', source: 'Sensor Mesh 04', status: 'Logged Only' },
        { timestamp: '2023-10-27 12:10:00', type: 'Severe Thunderstorm', severity: 'WARNING', region: 'Kansas City, MO', source: 'Regional NEXRAD', status: 'Broadcasted' },
    ];

    const getSeverityStyle = (severity: string) => {
        switch (severity) {
            case 'CRITICAL': return { bg: '#ef4444', color: 'white' };
            case 'WARNING': return { bg: '#f97316', color: 'white' };
            case 'ADVISORY': return { bg: '#eab308', color: 'black' };
            default: return { bg: '#64748b', color: 'white' };
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#0f1221' }}>
            {/* Top Navigation */}
            <header style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', background: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '20px' }}>storm</span>
                        </div>
                        <div>
                            <span style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>SentinelWeather</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }}></span>
                                <span style={{ fontSize: '10px', color: '#22c55e', fontWeight: 600 }}>SYSTEM LIVE</span>
                            </div>
                        </div>
                    </div>

                    <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Link to="/admin" style={{ padding: '8px 16px', color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 500, borderBottom: '2px solid #3b82f6' }}>Dashboard</Link>
                        <Link to="/alerts" style={{ padding: '8px 16px', color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Alert Logs</Link>
                        <Link to="/team" style={{ padding: '8px 16px', color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Sensor Map</Link>
                        <Link to="/settings" style={{ padding: '8px 16px', color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Regional Config</Link>
                    </nav>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '8px 16px' }}>
                        <span className="material-symbols-outlined" style={{ color: '#64748b', fontSize: '18px' }}>search</span>
                        <input type="text" placeholder="Search signals..." style={{ background: 'none', border: 'none', color: 'white', fontSize: '13px', width: '140px', outline: 'none' }} />
                    </div>

                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
                        <span className="material-symbols-outlined" style={{ color: '#94a3b8', fontSize: '22px' }}>notifications</span>
                        <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div>
                            <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', margin: 0, textAlign: 'right' }}>Admin User</p>
                            <p style={{ fontSize: '11px', color: '#64748b', margin: 0, textAlign: 'right' }}>Operations Command</p>
                        </div>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: 'white', fontSize: '16px', fontWeight: 600 }}>A</span>
                        </div>
                    </div>
                </div>
            </header>

            <main style={{ padding: '24px 32px' }}>
                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <span className="material-symbols-outlined" style={{ color: '#3b82f6', fontSize: '24px' }}>bolt</span>
                            <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>EXCELLENT</span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>Server Latency</p>
                        <p style={{ fontSize: '28px', fontWeight: 700, color: 'white', margin: 0 }}>14 <span style={{ fontSize: '14px', fontWeight: 400 }}>MS</span> <span style={{ fontSize: '12px', color: '#22c55e' }}>-2ms</span></p>
                    </div>

                    <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <span className="material-symbols-outlined" style={{ color: '#eab308', fontSize: '24px' }}>verified</span>
                            <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>OPERATIONAL</span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>API Uptime (30d)</p>
                        <p style={{ fontSize: '28px', fontWeight: 700, color: 'white', margin: 0 }}>99.99 <span style={{ fontSize: '14px', fontWeight: 400 }}>%</span> <span style={{ fontSize: '12px', color: '#64748b' }}>No downtime</span></p>
                    </div>

                    <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <span className="material-symbols-outlined" style={{ color: '#06b6d4', fontSize: '24px' }}>sync_alt</span>
                            <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>SYNCING</span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>Data Feed Rate</p>
                        <p style={{ fontSize: '28px', fontWeight: 700, color: 'white', margin: 0 }}>1.2 <span style={{ fontSize: '14px', fontWeight: 400 }}>GB/s</span> <span style={{ fontSize: '12px', color: '#22c55e' }}>↗</span></p>
                    </div>

                    <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <span className="material-symbols-outlined" style={{ color: '#a855f7', fontSize: '24px' }}>groups</span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>Live Users</p>
                        <p style={{ fontSize: '28px', fontWeight: 700, color: 'white', margin: 0 }}>24,812 <span style={{ fontSize: '12px', color: '#22c55e' }}>+12%</span></p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
                    {/* Chart */}
                    <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white', margin: 0 }}>Alert Frequency</h3>
                                <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Historical trend by severity levels</p>
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                {['1H', '24H', '7D'].map(range => (
                                    <button
                                        key={range}
                                        onClick={() => setTimeRange(range)}
                                        style={{
                                            padding: '6px 12px', border: '1px solid #334155', borderRadius: '6px',
                                            background: timeRange === range ? '#334155' : 'transparent',
                                            color: 'white', fontSize: '12px', fontWeight: 500, cursor: 'pointer'
                                        }}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ height: 250 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                        labelStyle={{ color: '#94a3b8' }}
                                    />
                                    <Bar dataKey="advisory" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                                    <Bar dataKey="warning" stackId="a" fill="#f97316" radius={[0, 0, 0, 0]} />
                                    <Bar dataKey="emergency" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Critical Command */}
                    <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <span className="material-symbols-outlined" style={{ color: '#ef4444', fontSize: '24px' }}>warning</span>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ef4444', margin: 0 }}>Critical Command</h3>
                        </div>

                        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 20px 0', lineHeight: 1.5 }}>
                            Immediate high-priority broadcast to all active users, regional authorities, and IoT infrastructure in the specified zones.
                        </p>

                        <div style={{ marginBottom: '16px' }}>
                            <p style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', margin: '0 0 8px 0' }}>Target Zones</p>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                <span style={{ background: '#334155', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '12px' }}>Pacific NW</span>
                                <span style={{ background: '#334155', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '12px' }}>Gulf Coast</span>
                                <span style={{ background: '#334155', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '12px' }}>Central Plains</span>
                            </div>
                        </div>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', cursor: 'pointer' }}>
                            <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                            <span style={{ fontSize: '13px', color: 'white' }}>Require multi-factor override</span>
                        </label>

                        <div style={{ marginBottom: '12px' }}>
                            <p style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', margin: '0 0 8px 0' }}>Slide to Authorize</p>
                        </div>

                        <button style={{
                            width: '100%', padding: '16px',
                            background: 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)',
                            border: 'none', borderRadius: '12px',
                            color: 'white', fontSize: '14px', fontWeight: 700,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            boxShadow: '0 0 24px rgba(239, 68, 68, 0.4)'
                        }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>cell_tower</span>
                            BROADCAST EMERGENCY ALERT
                        </button>
                        <p style={{ fontSize: '10px', color: '#ef4444', textAlign: 'center', margin: '8px 0 0 0' }}>CAUTION: This action cannot be undone.</p>
                    </div>
                </div>

                {/* Alert History */}
                <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white', margin: 0 }}>Recent Alert History</h3>
                            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Log of all outgoing and incoming weather signals</p>
                        </div>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid #334155', borderRadius: '8px', padding: '8px 16px', color: 'white', fontSize: '13px', cursor: 'pointer' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>download</span>
                            Export CSV
                        </button>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #334155' }}>
                                <th style={{ padding: '12px 0', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Timestamp</th>
                                <th style={{ padding: '12px 0', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Event Type</th>
                                <th style={{ padding: '12px 0', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Severity</th>
                                <th style={{ padding: '12px 0', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Region</th>
                                <th style={{ padding: '12px 0', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Source</th>
                                <th style={{ padding: '12px 0', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alertHistory.map((alert, i) => {
                                const sevStyle = getSeverityStyle(alert.severity);
                                return (
                                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                        <td style={{ padding: '16px 0', fontSize: '13px', color: '#94a3b8', fontFamily: 'monospace' }}>{alert.timestamp}</td>
                                        <td style={{ padding: '16px 0', fontSize: '13px', color: 'white', fontWeight: 500 }}>{alert.type}</td>
                                        <td style={{ padding: '16px 0' }}>
                                            <span style={{ background: sevStyle.bg, color: sevStyle.color, padding: '4px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>{alert.severity}</span>
                                        </td>
                                        <td style={{ padding: '16px 0', fontSize: '13px', color: '#94a3b8' }}>{alert.region}</td>
                                        <td style={{ padding: '16px 0', fontSize: '13px', color: '#94a3b8' }}>{alert.source}</td>
                                        <td style={{ padding: '16px 0', fontSize: '13px', color: alert.status === 'Broadcasted' ? '#22c55e' : '#64748b', fontWeight: 500 }}>{alert.status}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span style={{ fontSize: '11px', color: '#64748b' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', marginRight: '6px' }}></span>
                                DB: CONNECTED
                            </span>
                            <span style={{ fontSize: '11px', color: '#64748b' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', marginRight: '6px' }}></span>
                                AUTH: ACTIVE
                            </span>
                            <span style={{ fontSize: '11px', color: '#64748b' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6', display: 'inline-block', marginRight: '6px' }}></span>
                                NODE: US-EAST-1
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '12px', color: '#64748b' }}>Showing 4 of 1,240 records</span>
                            <button style={{ padding: '6px 12px', background: 'transparent', border: '1px solid #334155', borderRadius: '6px', color: '#94a3b8', fontSize: '12px', cursor: 'pointer' }}>Previous</button>
                            <button style={{ padding: '6px 12px', background: '#3b82f6', border: 'none', borderRadius: '6px', color: 'white', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>1</button>
                            <button style={{ padding: '6px 12px', background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '12px', cursor: 'pointer' }}>2</button>
                            <button style={{ padding: '6px 12px', background: 'transparent', border: '1px solid #334155', borderRadius: '6px', color: '#94a3b8', fontSize: '12px', cursor: 'pointer' }}>Next</button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>SENTINEL WEATHER ADMIN v2.4.12</span>
                    </div>
                </div>
            </main>
        </div>
    );
}
