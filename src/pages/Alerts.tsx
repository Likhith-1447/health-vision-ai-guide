
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { MapPin, AlertTriangle, TrendingUp, Shield, Calendar, Bell, Thermometer, Droplets, Sparkles, Loader2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface HealthAlert {
  id: string;
  disease: string;
  risk: 'low' | 'medium' | 'high' | 'critical';
  region: string;
  description: string;
  prevention: string[];
  ayurvedicRemedies: string[];
  timeline: string;
}

const Alerts = () => {
  const [location, setLocation] = useState("Detecting location...");
  const [alerts, setAlerts] = useState<HealthAlert[]>([]);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Get location name from coordinates
            const locationResponse = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=your-api-key`
            );
            
            // Simulate location-based alerts (since we don't have real API keys)
            setTimeout(() => {
              const detectedCity = "Hyderabad"; // Simulated
              setLocation(`${detectedCity}, Telangana`);
              
              // Generate location-specific alerts
              const locationAlerts = [
                {
                  id: '1',
                  disease: 'Dengue Fever',
                  risk: 'high' as const,
                  region: `${detectedCity} Metro`,
                  description: `Monsoon season increases dengue risk in ${detectedCity} due to stagnant water. Cases reported 40% higher than last year in this region.`,
                  prevention: ['Remove stagnant water', 'Use mosquito nets', 'Wear full sleeves', 'Apply repellent'],
                  ayurvedicRemedies: ['Tulsi leaves tea', 'Giloy juice', 'Papaya leaf extract', 'Neem oil application'],
                  timeline: 'Next 2-3 weeks'
                },
                {
                  id: '2',
                  disease: 'Viral Fever',
                  risk: 'medium' as const,
                  region: 'South India',
                  description: `Seasonal flu outbreak expected in ${detectedCity} due to weather changes and increased air pollution.`,
                  prevention: ['Maintain hygiene', 'Avoid crowded places', 'Boost immunity', 'Stay hydrated'],
                  ayurvedicRemedies: ['Ginger-honey tea', 'Turmeric milk', 'Amla juice', 'Brahmi for recovery'],
                  timeline: 'This week'
                },
                {
                  id: '3',
                  disease: 'Air Pollution Related Issues',
                  risk: 'medium' as const,
                  region: `${detectedCity} Urban Areas`,
                  description: `Air quality deterioration in ${detectedCity} may trigger asthma and breathing problems in sensitive individuals.`,
                  prevention: ['Wear N95 masks', 'Stay indoors during peak pollution', 'Use air purifiers', 'Practice breathing exercises'],
                  ayurvedicRemedies: ['Vasaka (Adhatoda) tea', 'Mulethi (Licorice)', 'Steam with eucalyptus', 'Pranayama exercises'],
                  timeline: 'Ongoing'
                }
              ];
              
              setAlerts(locationAlerts);
              setLoadingLocation(false);
            }, 2000);
            
          } catch (error) {
            console.error('Error fetching location:', error);
            // Fallback to default location
            setLocation("Hyderabad, Telangana");
            setLoadingLocation(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Fallback to default location
          setLocation("Location access denied - Using default region");
          setLoadingLocation(false);
          
          // Set default alerts
          setAlerts([
            {
              id: '1',
              disease: 'Seasonal Flu',
              risk: 'medium',
              region: 'General Region',
              description: 'Seasonal flu cases are increasing. General prevention measures recommended.',
              prevention: ['Maintain hygiene', 'Boost immunity', 'Stay hydrated', 'Avoid crowded places'],
              ayurvedicRemedies: ['Ginger tea', 'Turmeric milk', 'Tulsi leaves', 'Honey with warm water'],
              timeline: 'This week'
            }
          ]);
        }
      );
    } else {
      setLocation("Geolocation not supported");
      setLoadingLocation(false);
    }
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-400 dark:border-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-800';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-950/20 dark:text-gray-400 dark:border-gray-800';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="relative">
                <Bell className="h-7 w-7 text-primary" />
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-orange-500 animate-pulse" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  Health Alerts
                </h1>
                <p className="text-sm text-muted-foreground">
                  Disease forecasting & prevention
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Disease Forecasting & Health Alerts
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              AI-powered epidemiology insights with regional disease forecasting and Ayurvedic prevention strategies
            </p>
          </div>

          {/* Location Status */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-foreground">
                    {loadingLocation ? (
                      <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                    ) : (
                      <MapPin className="h-5 w-5 text-blue-600" />
                    )}
                    <span className="font-semibold">Current Location:</span>
                    <span>{location}</span>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800">
                  <Calendar className="h-3 w-3 mr-1" />
                  Updated Today
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Weather Impact Alert */}
          <Alert className="mb-8 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
            <Thermometer className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              <strong>Weather Impact:</strong> Current monsoon conditions with high humidity (78%) and temperature fluctuations 
              may increase vector-borne disease risks. Enhanced vigilance recommended for your location.
            </AlertDescription>
          </Alert>

          {/* Active Alerts */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Active Health Alerts for Your Region</h2>
            
            {loadingLocation ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="animate-pulse mb-4">
                    <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">Loading regional health alerts...</p>
                </CardContent>
              </Card>
            ) : (
              alerts.map((alert) => (
                <Card key={alert.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2 text-xl">
                          <span>{alert.disease}</span>
                          <Badge className={`${getRiskColor(alert.risk)} flex items-center space-x-1`}>
                            {getRiskIcon(alert.risk)}
                            <span className="capitalize">{alert.risk} Risk</span>
                          </Badge>
                        </CardTitle>
                        <CardDescription className="flex items-center space-x-2 mt-2">
                          <MapPin className="h-4 w-4" />
                          <span>{alert.region}</span>
                          <span className="text-muted-foreground">•</span>
                          <Calendar className="h-4 w-4" />
                          <span>{alert.timeline}</span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Current Situation</h4>
                      <p className="text-muted-foreground">{alert.description}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-blue-600" />
                          Prevention Measures
                        </h4>
                        <ul className="space-y-2">
                          {alert.prevention.map((measure, index) => (
                            <li key={index} className="flex items-center space-x-2 text-muted-foreground">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span>{measure}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center">
                          <Droplets className="h-4 w-4 mr-2 text-green-600" />
                          Ayurvedic Remedies
                        </h4>
                        <ul className="space-y-2">
                          {alert.ayurvedicRemedies.map((remedy, index) => (
                            <li key={index} className="flex items-center space-x-2 text-muted-foreground">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>{remedy}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Prevention Tips */}
          <Card className="mt-12 border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/10 dark:to-blue-950/10">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Shield className="mr-2 h-5 w-5 text-green-600" />
                General Prevention Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Stay Hydrated</h4>
                <p className="text-sm text-muted-foreground">Drink 8-10 glasses of clean water daily. Add lemon or mint for better immunity.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-950/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Boost Immunity</h4>
                <p className="text-sm text-muted-foreground">Regular exercise, adequate sleep, and Ayurvedic herbs like Ashwagandha and Amla.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Early Detection</h4>
                <p className="text-sm text-muted-foreground">Monitor symptoms closely and consult healthcare providers at first signs of illness.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Alerts;
