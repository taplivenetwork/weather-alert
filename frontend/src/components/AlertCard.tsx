export interface Alert {
    id: string;
    type: string;
    severity: 'emergency' | 'warning' | 'advisory' | 'info';
    title: string;
    description: string;
    recommendation: string;
    location: string;
    timestamp: string;
    imageUrl?: string;
}

interface AlertCardProps {
    alert: Alert;
    onAcknowledge?: (id: string) => void;
    onDismiss?: (id: string) => void;
}

export default function AlertCard({ alert, onAcknowledge, onDismiss }: AlertCardProps) {
    const severityConfig = {
        emergency: {
            borderColor: 'border-l-emergency',
            textColor: 'text-emergency',
            bgColor: 'bg-emergency/20',
            icon: 'emergency_home',
            label: 'EMERGENCY'
        },
        warning: {
            borderColor: 'border-l-warning',
            textColor: 'text-warning',
            bgColor: 'bg-warning/20',
            icon: 'flood',
            label: 'WARNING'
        },
        advisory: {
            borderColor: 'border-l-advisory',
            textColor: 'text-advisory',
            bgColor: 'bg-advisory/20',
            icon: 'visibility_off',
            label: 'ADVISORY'
        },
        info: {
            borderColor: 'border-l-info',
            textColor: 'text-info',
            bgColor: 'bg-info/20',
            icon: 'info',
            label: 'INFO'
        }
    };

    const config = severityConfig[alert.severity];

    return (
        <div className={`glass-card group overflow-hidden rounded-xl border-l-4 ${config.borderColor} transition-all hover:bg-slate-800/40`}>
            <div className="flex flex-col md:flex-row p-5 gap-6">
                {/* Image */}
                {alert.imageUrl && (
                    <div className="w-full md:w-48 h-32 md:h-auto overflow-hidden rounded-lg bg-slate-800 relative">
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-500"
                            style={{ backgroundImage: `url(${alert.imageUrl})` }}
                        />
                        {alert.severity === 'emergency' && (
                            <div className="absolute top-2 left-2">
                                <span className="bg-emergency text-white text-[10px] font-black px-2 py-0.5 rounded">
                                    LIVE RADAR
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        {/* Header */}
                        <div className="flex justify-between items-start mb-1">
                            <span className={`${config.textColor} text-xs font-black uppercase tracking-widest flex items-center gap-1`}>
                                <span className="material-symbols-outlined text-sm">{config.icon}</span>
                                {config.label} • {alert.location}
                            </span>
                            <span className="text-slate-500 text-xs font-mono">{alert.timestamp}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-2 leading-tight">{alert.title}</h3>

                        {/* Description */}
                        <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">
                            {alert.description}
                        </p>

                        {/* Recommendation */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${config.bgColor} ${config.textColor} text-xs font-bold border ${config.textColor.replace('text-', 'border-')}/30`}>
                                <span className="material-symbols-outlined text-base">shield</span>
                                {alert.recommendation}
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => onAcknowledge?.(alert.id)}
                            className="px-5 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            Acknowledge
                        </button>
                        <button
                            onClick={() => onDismiss?.(alert.id)}
                            className="px-5 py-2 border border-slate-700 text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-800 transition-all"
                        >
                            Dismiss Alert
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
