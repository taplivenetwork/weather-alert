interface CriticalAlertProps {
    title: string;
    subtitle: string;
    action: string;
    description: string;
    icon?: string;
    proximity?: string;
    closingSpeed?: string;
    confidence?: number;
    nearestShelter?: string;
    onAcknowledge: () => void;
}

export default function CriticalAlert({
    title,
    subtitle,
    action,
    description,
    icon = 'bolt',
    proximity,
    closingSpeed,
    confidence = 98,
    nearestShelter,
    onAcknowledge
}: CriticalAlertProps) {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-between alert-gradient p-6">
            {/* Top Nav */}
            <header className="w-full flex items-center justify-between py-4 px-2 max-w-4xl border-b border-white/10">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-warning text-3xl">shield</span>
                    <h2 className="text-white text-xl font-black uppercase tracking-tighter">SentinelWeather</h2>
                </div>
                <div className="text-xs font-bold bg-black/40 px-3 py-1 rounded-full border border-white/20">
                    LIVE INTEL • {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </div>
            </header>

            {/* Central Content */}
            <main className="flex flex-col items-center justify-center flex-1 w-full max-w-2xl text-center space-y-8">
                {/* Pulsing Icon */}
                <div className="relative">
                    <div className="absolute inset-0 bg-warning/20 blur-[60px] rounded-full animate-pulse"></div>
                    <div className="relative bg-black/40 p-10 rounded-full border-4 border-warning animate-pulse-glow">
                        <span className="material-symbols-outlined filled text-[120px] text-warning">{icon}</span>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight">
                        {title}<br />
                        <span className="text-warning">{subtitle}</span><br />
                        DETECTED
                    </h1>

                    <div className="bg-white text-emergency py-4 px-6 rounded-xl inline-block shadow-2xl">
                        <p className="text-xl md:text-2xl font-black tracking-wide uppercase">
                            {action}
                        </p>
                    </div>

                    <p className="text-lg md:text-xl font-medium text-white/80 max-w-md mx-auto">
                        {description}
                    </p>
                </div>

                {/* Proximity Cards */}
                {(proximity || confidence) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
                        {proximity && (
                            <div className="flex flex-col items-center gap-1 rounded-xl p-6 bg-black/50 border border-white/10 backdrop-blur-sm">
                                <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Strike Proximity</p>
                                <p className="text-white text-3xl font-black">{proximity}</p>
                                {closingSpeed && (
                                    <div className="flex items-center gap-1 text-warning font-bold">
                                        <span className="material-symbols-outlined text-sm">warning</span>
                                        CLOSING SPEED: {closingSpeed}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex flex-col items-center gap-1 rounded-xl p-6 bg-black/50 border border-white/10 backdrop-blur-sm">
                            <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Confidence Level</p>
                            <p className="text-white text-3xl font-black">{confidence}% CRITICAL</p>
                            <div className="flex items-center gap-1 text-green-400 font-bold uppercase">
                                <span className="material-symbols-outlined text-sm">verified</span>
                                DUAL-SENSOR VERIFIED
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Map Context */}
            {nearestShelter && (
                <div className="w-full max-w-2xl px-4 py-6 hidden md:block">
                    <div className="relative h-32 w-full rounded-xl overflow-hidden border-2 border-white/20 bg-slate-900">
                        <div className="absolute inset-0 bg-red-900/40"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="relative flex items-center justify-center">
                                <div className="absolute w-12 h-12 bg-warning/30 rounded-full animate-ping"></div>
                                <span className="material-symbols-outlined text-white text-2xl relative">person_pin_circle</span>
                            </div>
                        </div>
                        <div className="absolute top-2 right-2 bg-black/80 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">
                            Nearest Shelter: {nearestShelter}
                        </div>
                    </div>
                </div>
            )}

            {/* Acknowledge Button */}
            <footer className="w-full max-w-4xl px-4 pb-8">
                <button
                    onClick={onAcknowledge}
                    className="w-full bg-warning hover:bg-orange-500 text-white flex flex-col items-center justify-center py-8 rounded-2xl shadow-[0_0_50px_rgba(234,88,12,0.4)] border-b-8 border-orange-900 active:translate-y-1 active:border-b-0 transition-all duration-100 group"
                >
                    <span className="text-4xl font-black uppercase tracking-tighter">ACKNOWLEDGE & DISMISS</span>
                    <span className="text-sm font-bold opacity-80 mt-1 uppercase tracking-widest">Long-press or heavy tap to clear</span>
                </button>
            </footer>
        </div>
    );
}
