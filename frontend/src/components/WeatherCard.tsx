interface WeatherData {
    temperature: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    visibility: number;
    cloudCover: number;
    condition: string;
    description: string;
    weatherScore: number;
}

interface WeatherCardProps {
    weather: WeatherData | null;
    isLoading: boolean;
    icon: string;
    locationName: string;
}

function WeatherCard({ weather, isLoading, icon, locationName }: WeatherCardProps) {
    if (isLoading) {
        return (
            <div className="card weather-card" style={{ minHeight: 200 }}>
                <div className="text-center" style={{ padding: '3rem' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                    <p>Loading weather data...</p>
                </div>
            </div>
        );
    }

    if (!weather) {
        return (
            <div className="card weather-card" style={{ minHeight: 200 }}>
                <div className="text-center" style={{ padding: '3rem' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌐</div>
                    <p>Unable to load weather</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card weather-card">
            <div style={{
                fontSize: '0.875rem',
                opacity: 0.8,
                marginBottom: '1rem',
                position: 'relative',
                zIndex: 1
            }}>
                📍 {locationName}
            </div>

            <div className="weather-main">
                <div className="weather-icon">{icon}</div>
                <div>
                    <div className="weather-temp">
                        {Math.round(weather.temperature)}
                        <span className="weather-temp-unit">°F</span>
                    </div>
                    <div className="weather-condition">{weather.description}</div>
                </div>
            </div>

            <div className="weather-details">
                <div className="weather-detail">
                    <div className="weather-detail-label">Wind</div>
                    <div className="weather-detail-value">{weather.windSpeed} mph</div>
                </div>
                <div className="weather-detail">
                    <div className="weather-detail-label">Humidity</div>
                    <div className="weather-detail-value">{weather.humidity}%</div>
                </div>
                <div className="weather-detail">
                    <div className="weather-detail-label">Visibility</div>
                    <div className="weather-detail-value">{weather.visibility?.toFixed(1)} mi</div>
                </div>
                <div className="weather-detail">
                    <div className="weather-detail-label">Score</div>
                    <div className="weather-detail-value">{weather.weatherScore}</div>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;
