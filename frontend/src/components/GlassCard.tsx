interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'darker' | 'panel';
}

export default function GlassCard({
    children,
    className = '',
    variant = 'default'
}: GlassCardProps) {
    const baseClasses = {
        default: 'glass',
        darker: 'glass-darker',
        panel: 'glass-panel'
    };

    return (
        <div className={`${baseClasses[variant]} rounded-2xl ${className}`}>
            {children}
        </div>
    );
}
