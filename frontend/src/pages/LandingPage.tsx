export default function LandingPage() {
    return (
        <div style={{ minHeight: '100vh', background: '#0f1221' }}>
            {/* Navigation */}
            <header style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 48px', background: 'rgba(15, 18, 33, 0.8)', backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', background: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '20px' }}>storm</span>
                    </div>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>SENTINEL WEATHER</span>
                </div>

                <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Features</a>
                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Enterprise</a>
                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Docs</a>
                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Pricing</a>
                </nav>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <a href="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Sign In</a>
                    <a href="/dashboard" style={{
                        background: '#3b82f6', color: 'white', padding: '10px 20px',
                        borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 600
                    }}>Get Started</a>
                </div>
            </header>

            {/* Hero Section */}
            <section style={{
                position: 'relative', minHeight: '100vh',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '120px 48px 80px',
                background: 'linear-gradient(180deg, #0f1221 0%, #1e293b 100%)',
                overflow: 'hidden'
            }}>
                {/* Background Image */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'url(/images/mountaineering.png)',
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    opacity: 0.3
                }}></div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, #0f1221 100%)' }}></div>

                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '800px' }}>
                    <span style={{
                        display: 'inline-block', marginBottom: '20px',
                        background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa',
                        padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600
                    }}>
                        Free Trial Available
                    </span>

                    <h1 style={{ fontSize: '56px', fontWeight: 800, color: 'white', lineHeight: 1.1, margin: '0 0 24px 0' }}>
                        Protecting those who
                        <br />
                        venture <span style={{ color: '#3b82f6' }}>outdoors</span>.
                    </h1>

                    <p style={{ fontSize: '18px', color: '#94a3b8', margin: '0 0 40px 0', lineHeight: 1.6 }}>
                        Keep your team, family, and community safe with AI-powered weather intelligence. Get reliable warnings for the activities that matter.
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                        <a href="/dashboard" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            background: '#3b82f6', color: 'white', padding: '16px 32px',
                            borderRadius: '12px', textDecoration: 'none', fontSize: '16px', fontWeight: 600,
                            boxShadow: '0 0 32px rgba(59, 130, 246, 0.4)'
                        }}>
                            Start Protecting Your Team
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
                        </a>
                        <a href="#demo" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            background: 'transparent', color: 'white', padding: '16px 32px',
                            borderRadius: '12px', textDecoration: 'none', fontSize: '16px', fontWeight: 500,
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            Book a Demo
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '120px 48px', background: '#0f1221' }}>
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: 700, color: 'white', margin: '0 0 16px 0' }}>Engineered for Reliability</h2>
                    <p style={{ fontSize: '16px', color: '#64748b', margin: 0 }}>Our 3-step process ensures you get accurate warnings faster than the market.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
                    {[
                        { step: '1', title: 'Deploy Sensors', desc: 'Deploy our compact, solar-powered sensors across your operational zones or connect your existing infrastructure.' },
                        { step: '2', title: 'Analyze Real-Time Data', desc: 'Our AI models continuously analyze weather patterns, sensor data, and regional conditions in real-time.' },
                        { step: '3', title: 'Life-Saving Alerts', desc: 'Receive precisely-targeted warnings up to 60% earlier than traditional weather services.' }
                    ].map((feature) => (
                        <div key={feature.step} style={{
                            background: 'rgba(30, 41, 59, 0.3)', borderRadius: '20px',
                            padding: '32px', border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '12px',
                                background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '20px', fontWeight: 700, marginBottom: '20px'
                            }}>
                                {feature.step}
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'white', margin: '0 0 12px 0' }}>{feature.title}</h3>
                            <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Use Cases Section */}
            <section style={{ padding: '120px 48px', background: '#0a0d17' }}>
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: 700, color: 'white', margin: '0 0 16px 0' }}>Built for every challenge</h2>
                    <p style={{ fontSize: '16px', color: '#64748b', margin: 0 }}>From the highest peaks to open oceans, SentinelWeather provides life-saving intelligence where it matters most.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
                    {[
                        { title: 'Mountaineering', image: '/images/mountaineering.png' },
                        { title: 'Industrial Assets', image: '/images/industrial.png' },
                        { title: 'Outdoor Tourism', image: '/images/kayaking.png' }
                    ].map((useCase) => (
                        <div key={useCase.title} style={{
                            borderRadius: '20px', overflow: 'hidden', position: 'relative',
                            height: '300px', cursor: 'pointer'
                        }}>
                            <img src={useCase.image} alt={useCase.title} style={{
                                position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'
                            }} />
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                                display: 'flex', alignItems: 'flex-end', padding: '24px'
                            }}>
                                <span style={{ fontSize: '18px', fontWeight: 600, color: 'white' }}>{useCase.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pricing Section */}
            <section style={{ padding: '120px 48px', background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)' }}>
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>Predictable protection</h2>
                    <p style={{ fontSize: '16px', color: '#64748b', margin: 0 }}>Choose the right tier. Customize your protection with optional add-ons.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
                    {/* Standard Plan */}
                    <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Standard</span>
                        <p style={{ fontSize: '14px', color: '#64748b', margin: '8px 0 24px 0' }}>For small teams & outdoor groups</p>

                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '32px' }}>
                            <span style={{ fontSize: '48px', fontWeight: 800, color: '#0f172a' }}>$49</span>
                            <span style={{ fontSize: '16px', color: '#64748b' }}>/mo</span>
                        </div>

                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
                            {['5 regions per account', 'Email & Push Notifications', 'API Access (5k requests)', '48-hour advance forecasting'].map((item) => (
                                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: '#334155' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#22c55e', fontSize: '18px' }}>check_circle</span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a href="/dashboard" style={{
                            display: 'block', textAlign: 'center',
                            background: '#0f172a', color: 'white', padding: '16px',
                            borderRadius: '12px', textDecoration: 'none', fontWeight: 600, fontSize: '14px'
                        }}>
                            Get Pro Plan
                        </a>
                    </div>

                    {/* Pro Plan */}
                    <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', borderRadius: '24px', padding: '40px', boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Pro</span>
                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: '8px 0 24px 0' }}>For businesses and field operations</p>

                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '32px' }}>
                            <span style={{ fontSize: '48px', fontWeight: 800, color: 'white' }}>$199</span>
                            <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)' }}>/mo</span>
                        </div>

                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
                            {['Unlimited regions', 'SMS, Email, Push, Webhook', 'Priority API (Unlimited)', '7-day extended forecasting', 'Custom geo-fence alerts', 'Dedicated support'].map((item) => (
                                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: 'white' }}>
                                    <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '18px' }}>check_circle</span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a href="/dashboard" style={{
                            display: 'block', textAlign: 'center',
                            background: 'white', color: '#3b82f6', padding: '16px',
                            borderRadius: '12px', textDecoration: 'none', fontWeight: 600, fontSize: '14px'
                        }}>
                            Go Pro Now
                        </a>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section style={{ padding: '60px 48px', background: '#0f1221', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '64px', flexWrap: 'wrap', opacity: 0.5 }}>
                    {['HELLY HANSEN', 'WIND VISION', 'ECO-WAVE', 'ALPINE PRO', 'SUMMIT GEAR'].map((brand) => (
                        <span key={brand} style={{ fontSize: '14px', fontWeight: 700, color: 'white', letterSpacing: '2px' }}>{brand}</span>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '60px 48px 30px', background: '#0a0d17', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', maxWidth: '1200px', margin: '0 auto 40px', flexWrap: 'wrap', gap: '40px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <div style={{ width: '32px', height: '32px', background: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '20px' }}>storm</span>
                            </div>
                            <span style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>SENTINEL WEATHER</span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#64748b', maxWidth: '300px', lineHeight: 1.6 }}>
                            Protecting people and assets with intelligent, hyper-local weather warnings.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '64px' }}>
                        <div>
                            <p style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '16px', textTransform: 'uppercase' }}>Product</p>
                            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px' }}>Features</a>
                                <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px' }}>Pricing</a>
                                <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px' }}>API Docs</a>
                            </nav>
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '16px', textTransform: 'uppercase' }}>Company</p>
                            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px' }}>About</a>
                                <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px' }}>Blog</a>
                                <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px' }}>Careers</a>
                            </nav>
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '16px', textTransform: 'uppercase' }}>Legal</p>
                            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px' }}>Privacy</a>
                                <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px' }}>Terms</a>
                            </nav>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <p style={{ fontSize: '12px', color: '#475569' }}>© 2024 SentinelWeather Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
