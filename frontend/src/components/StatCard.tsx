interface StatCardProps {
    icon: string;
    iconBgColor: string;
    iconColor: string;
    label: string;
    value: string | number;
    unit?: string;
    status?: 'excellent' | 'operational' | 'syncing' | 'warning' | 'error';
    trend?: string;
    trendColor?: string;
}

export default function StatCard({
    icon,
    iconBgColor,
    iconColor,
    label,
    value,
    unit,
    status,
    trend,
    trendColor = 'text-slate-500'
}: StatCardProps) {
    const statusConfig = {
        excellent: { text: 'EXCELLENT', bgColor: 'bg-green-500/10', textColor: 'text-green-500' },
        operational: { text: 'OPERATIONAL', bgColor: 'bg-green-500/10', textColor: 'text-green-500' },
        syncing: { text: 'SYNCING', bgColor: 'bg-amber-500/10', textColor: 'text-amber-500' },
        warning: { text: 'WARNING', bgColor: 'bg-amber-500/10', textColor: 'text-amber-500' },
        error: { text: 'ERROR', bgColor: 'bg-red-500/10', textColor: 'text-red-500' }
    };

    return (
        <div className="glass p-5 rounded-xl">
            <div className="flex justify-between items-start mb-4">
                <span className={`p-2 ${iconBgColor} ${iconColor} rounded-lg material-symbols-outlined`}>
                    {icon}
                </span>
                {status && (
                    <span className={`text-[10px] font-bold ${statusConfig[status].textColor} ${statusConfig[status].bgColor} px-2 py-0.5 rounded`}>
                        {statusConfig[status].text}
                    </span>
                )}
            </div>

            <p className="text-slate-400 text-sm font-medium">{label}</p>

            <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black text-white">
                    {value}
                    {unit && <span className="text-lg font-normal text-slate-500 ml-1">{unit}</span>}
                </h3>
                {trend && (
                    <span className={`text-xs ${trendColor}`}>{trend}</span>
                )}
            </div>
        </div>
    );
}
