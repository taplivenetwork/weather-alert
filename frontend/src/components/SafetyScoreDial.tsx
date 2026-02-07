interface SafetyScoreDialProps {
    score: number;
    trend?: number;
    size?: 'sm' | 'md' | 'lg';
}

export default function SafetyScoreDial({
    score,
    trend = 0,
    size = 'lg'
}: SafetyScoreDialProps) {
    // Calculate stroke dashoffset for the circular progress
    const circumference = 2 * Math.PI * 45; // radius = 45
    const progress = (score / 100) * circumference;
    const dashOffset = circumference - progress;

    // Determine color based on score
    const getScoreColor = () => {
        if (score >= 70) return 'text-primary';
        if (score >= 40) return 'text-warning';
        return 'text-emergency';
    };

    const getStatusText = () => {
        if (score >= 70) return { text: 'Good', color: 'text-green-400' };
        if (score >= 40) return { text: 'Moderate', color: 'text-warning' };
        return { text: 'Poor', color: 'text-emergency' };
    };

    const status = getStatusText();

    const sizeClasses = {
        sm: 'w-24 h-24',
        md: 'w-36 h-36',
        lg: 'w-48 h-48'
    };

    const textSizes = {
        sm: 'text-2xl',
        md: 'text-4xl',
        lg: 'text-5xl'
    };

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">
                Outdoor Safety Score
            </h3>

            <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
                {/* SVG Gauge */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-slate-800"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        className={`${getScoreColor()} safety-glow transition-all duration-1000`}
                    />
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`${textSizes[size]} font-black text-white`}>{score}</span>
                    {trend !== 0 && (
                        <span className={`text-xs font-medium flex items-center gap-1 ${trend > 0 ? 'text-green-400' : 'text-emergency'}`}>
                            <span className="material-symbols-outlined text-sm">
                                {trend > 0 ? 'trending_up' : 'trending_down'}
                            </span>
                            {trend > 0 ? '+' : ''}{trend}%
                        </span>
                    )}
                </div>
            </div>

            <p className="mt-6 text-slate-300">
                Conditions are <span className={`${status.color} font-bold`}>{status.text}</span> for outdoor activities
            </p>
        </div>
    );
}
