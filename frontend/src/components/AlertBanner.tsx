interface AlertBannerProps {
    message: string;
    severity?: 'warning' | 'emergency' | 'info';
    onDismiss?: () => void;
}

export default function AlertBanner({
    message,
    severity = 'warning',
    onDismiss
}: AlertBannerProps) {
    const severityConfig = {
        warning: {
            bgColor: 'bg-amber-400',
            textColor: 'text-amber-950',
            icon: 'warning'
        },
        emergency: {
            bgColor: 'bg-emergency',
            textColor: 'text-white',
            icon: 'emergency_home'
        },
        info: {
            bgColor: 'bg-blue-500',
            textColor: 'text-white',
            icon: 'info'
        }
    };

    const config = severityConfig[severity];

    return (
        <div className={`${config.bgColor} ${config.textColor} px-6 py-3 flex items-center justify-between sticky top-0 z-50`}>
            <div className="flex items-center gap-3">
                <span className="material-symbols-outlined font-bold">{config.icon}</span>
                <p className="text-sm font-semibold">{message}</p>
            </div>
            {onDismiss && (
                <button
                    onClick={onDismiss}
                    className={`${config.textColor} opacity-70 hover:opacity-100`}
                >
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>
            )}
        </div>
    );
}
