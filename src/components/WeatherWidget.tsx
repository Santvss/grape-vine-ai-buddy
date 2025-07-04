import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  Thermometer,
  Eye,
  Gauge,
  Calendar,
  AlertTriangle,
  RefreshCw
} from "lucide-react";

interface WeatherData {
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    pressure: number;
    visibility: number;
    condition: string;
    icon: string;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    precipitation: number;
    icon: string;
  }>;
  alerts: Array<{
    type: string;
    severity: string;
    message: string;
    validUntil: string;
  }>;
}

export const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    current: {
      temperature: 22,
      humidity: 65,
      windSpeed: 12,
      windDirection: "NW",
      pressure: 1013,
      visibility: 10,
      condition: "Partly Cloudy",
      icon: "partly-cloudy"
    },
    forecast: [
      {
        date: "2024-01-08",
        high: 24,
        low: 16,
        condition: "Sunny",
        precipitation: 0,
        icon: "sunny"
      },
      {
        date: "2024-01-09",
        high: 26,
        low: 18,
        condition: "Partly Cloudy",
        precipitation: 10,
        icon: "partly-cloudy"
      },
      {
        date: "2024-01-10",
        high: 20,
        low: 14,
        condition: "Light Rain",
        precipitation: 75,
        icon: "rainy"
      },
      {
        date: "2024-01-11",
        high: 23,
        low: 15,
        condition: "Cloudy",
        precipitation: 20,
        icon: "cloudy"
      },
      {
        date: "2024-01-12",
        high: 25,
        low: 17,
        condition: "Sunny",
        precipitation: 5,
        icon: "sunny"
      }
    ],
    alerts: [
      {
        type: "Frost Warning",
        severity: "moderate",
        message: "Temperatures may drop below 0°C overnight. Protect sensitive vines.",
        validUntil: "2024-01-09T08:00:00Z"
      }
    ]
  });

  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refreshWeather = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLastUpdated(new Date());
      setLoading(false);
    }, 1000);
  };

  const getConditionIcon = (condition: string) => {
    // This is a simplified icon mapping
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return '☀️';
      case 'partly-cloudy':
      case 'partly cloudy':
        return '⛅';
      case 'cloudy':
      case 'overcast':
        return '☁️';
      case 'rainy':
      case 'light rain':
      case 'rain':
        return '🌧️';
      case 'snow':
        return '❄️';
      case 'fog':
        return '🌫️';
      default:
        return '🌤️';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return 'bg-destructive text-destructive-foreground';
      case 'moderate': return 'bg-harvest text-foreground';
      case 'minor': return 'bg-forest text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTemperatureAdvice = (temp: number) => {
    if (temp < 0) return "Risk of frost damage - protect vines!";
    if (temp < 10) return "Cold conditions - monitor vine health";
    if (temp > 35) return "High heat - ensure adequate irrigation";
    if (temp >= 20 && temp <= 30) return "Optimal growing conditions";
    return "Monitor vine conditions";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Weather Monitor</h2>
          <p className="text-muted-foreground">Current conditions and vineyard-specific forecasts</p>
        </div>
        <Button 
          onClick={refreshWeather}
          disabled={loading}
          variant="outline"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Weather Alerts */}
      {weatherData.alerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Weather Alerts</h3>
          {weatherData.alerts.map((alert, index) => (
            <Card key={index} className="shadow-card border-l-4 border-l-harvest">
              <CardContent className="pt-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-harvest mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-foreground">{alert.type}</h4>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">
                      Valid until: {new Date(alert.validUntil).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Current Weather */}
      <Card className="shadow-farm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CloudSun className="w-5 h-5 text-harvest" />
            <span>Current Conditions</span>
          </CardTitle>
          <CardDescription>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">{getConditionIcon(weatherData.current.condition)}</div>
              <div className="text-3xl font-bold text-grape mb-1">
                {weatherData.current.temperature}°C
              </div>
              <p className="text-sm text-muted-foreground">{weatherData.current.condition}</p>
              <p className="text-xs text-harvest mt-2">
                {getTemperatureAdvice(weatherData.current.temperature)}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Droplets className="w-4 h-4 text-sky" />
                <span className="text-sm">Humidity: {weatherData.current.humidity}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wind className="w-4 h-4 text-forest" />
                <span className="text-sm">Wind: {weatherData.current.windSpeed} km/h {weatherData.current.windDirection}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Gauge className="w-4 h-4 text-grape" />
                <span className="text-sm">Pressure: {weatherData.current.pressure} hPa</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-earth" />
                <span className="text-sm">Visibility: {weatherData.current.visibility} km</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-foreground">Vineyard Impact</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Disease Risk:</span>
                  <Badge variant={weatherData.current.humidity > 80 ? "destructive" : "secondary"}>
                    {weatherData.current.humidity > 80 ? "High" : "Low"}
                  </Badge>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Irrigation Need:</span>
                  <Badge variant={weatherData.current.humidity < 40 ? "destructive" : "secondary"}>
                    {weatherData.current.humidity < 40 ? "High" : "Normal"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5-Day Forecast */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-grape" />
            <span>5-Day Forecast</span>
          </CardTitle>
          <CardDescription>Plan your vineyard activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="text-center p-3 rounded-lg border bg-muted/20">
                <div className="text-sm font-medium text-foreground mb-2">
                  {index === 0 ? 'Today' : 
                   index === 1 ? 'Tomorrow' :
                   new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                </div>
                <div className="text-2xl mb-2">{getConditionIcon(day.condition)}</div>
                <div className="text-sm text-muted-foreground mb-1">{day.condition}</div>
                <div className="space-y-1">
                  <div className="text-sm">
                    <span className="font-semibold text-grape">{day.high}°</span>
                    <span className="text-muted-foreground">/{day.low}°</span>
                  </div>
                  {day.precipitation > 0 && (
                    <div className="flex items-center justify-center space-x-1 text-xs text-sky">
                      <Droplets className="w-3 h-3" />
                      <span>{day.precipitation}%</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vineyard Recommendations */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Vineyard Recommendations</CardTitle>
          <CardDescription>Based on current and forecasted conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-forest/10 rounded-lg">
              <Droplets className="w-5 h-5 text-forest mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-foreground">Irrigation Schedule</h4>
                <p className="text-sm text-muted-foreground">
                  Light rain expected on Jan 10. Consider reducing irrigation 24 hours before.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-grape/10 rounded-lg">
              <Thermometer className="w-5 h-5 text-grape mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-foreground">Temperature Alert</h4>
                <p className="text-sm text-muted-foreground">
                  Optimal growing temperatures this week. Good time for vine training activities.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-harvest/10 rounded-lg">
              <Wind className="w-5 h-5 text-harvest mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-foreground">Wind Conditions</h4>
                <p className="text-sm text-muted-foreground">
                  Moderate winds expected. Good for disease prevention through air circulation.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};