interface Forecast {
    datetime: string;
    temperature: number;
    condition: string;
    icon: string;
    precipitationProbability: number;
}

interface ForecastChartProps {
    forecast: Forecast[];
}

function ForecastChart({ forecast }: ForecastChartProps) {
    const getWeatherIcon = (condition: string): string => {
        const icons: Record<string, string> = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Drizzle': '🌦️',
            'Thunderstorm': '⛈️',
            'Snow': '❄️',
            'Mist': '🌫️',
        };
        return icons[condition] || '🌤️';
    };

    const formatTime = (datetime: string) => {
        return new Date(datetime).toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true
        });
    };

    if (forecast.length === 0) {
        return (
            <div className="text-center text-muted" style={{ padding: '2rem' }}>
                No forecast data available
            </div>
        );
    }

    return (
        <div className="forecast-grid">
            {forecast.slice(0, 8).map((item, index) => (
                <div key={index} className="forecast-item">
                    <div className="forecast-time">{formatTime(item.datetime)}</div>
                    <div className="forecast-icon">{getWeatherIcon(item.condition)}</div>
                    <div className="forecast-temp">{Math.round(item.temperature)}°</div>
                    {item.precipitationProbability > 0 && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-cyan)' }}>
                            💧 {item.precipitationProbability}%
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ForecastChart;
