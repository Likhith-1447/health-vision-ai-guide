
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, AlertTriangle, TrendingUp, Shield, Calendar, Bell, Thermometer, Droplets } from "lucide-react";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    // Simulate location detection
    setTimeout(() => {
      setLocation("Hyderabad, Telangana");
      setAlerts([
        {
          id: '1',
          disease: 'Dengue Fever',
          risk: 'high',
          region: 'Hyderabad Metro',
          description: 'Monsoon season increases dengue risk due to stagnant water. Cases reported 40% higher than last year.',
          prevention: ['Remove stagnant water', 'Use mosquito nets', 'Wear full sleeves', 'Apply repellent'],
          ayurvedicRemedies: ['Tulsi leaves tea', 'Giloy juice', 'Papaya leaf extract', 'Neem oil application'],
          timeline: 'Next 2-3 weeks'
        },
        {
          id: '2',
          disease: 'Viral Fever',
          risk: 'medium',
          region: 'South India',
          description: 'Seasonal flu outbreak expected due to weather changes and increased air pollution.',
          prevention: ['Maintain hygiene', 'Avoid crowded places', 'Boost immunity', 'Stay hydrated'],
          ayurvedicRemedies: ['Ginger-honey tea', 'Turmeric milk', 'Amla juice', 'Brahmi for recovery'],
          timeline: 'This week'
        },
        {
          id: '3',
          disease: 'Respiratory Issues',
          risk: 'medium',
          region: 'Urban Areas',
          description: 'Air quality deterioration may trigger asthma and breathing problems in sensitive individuals.',
          prevention: ['Wear N95 masks', 'Stay indoors during peak pollution', 'Use air purifiers', 'Practice breathing exercises'],
          ayurvedicRemedies: ['Vasaka (Adhatoda) tea', 'Mulethi (Licorice)', 'Steam with eucalyptus', 'Pranayama exercises'],
          timeline: 'Ongoing'
        }
      ]);
    }, 2000);
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Bell className="h-6 w-6 text-orange-600" />
            <span className="text-xl font-bold text-gray-800">AyurGen - Health Alerts</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Disease Forecasting & Health Alerts
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              AI-powered epidemiology insights with regional disease forecasting and Ayurvedic prevention strategies
            </p>
          </div>

          {/* Location Status */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">Current Location:</span>
                  <span>{location}</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Calendar className="h-3 w-3 mr-1" />
                  Updated Today
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Weather Impact Alert */}
          <Alert className="mb-8 border-blue-200 bg-blue-50">
            <Thermometer className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Weather Impact:</strong> Current monsoon conditions with high humidity (78%) and temperature fluctuations 
              may increase vector-borne disease risks. Enhanced vigilance recommended.
            </AlertDescription>
          </Alert>

          {/* Active Alerts */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Active Health Alerts for Your Region</h2>
            
            {alerts.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="animate-pulse mb-4">
                    <Bell className="mx-auto h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-gray-500">Loading regional health alerts...</p>
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
                          <span className="text-gray-400">•</span>
                          <Calendar className="h-4 w-4" />
                          <span>{alert.timeline}</span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Current Situation</h4>
                      <p className="text-gray-600">{alert.description}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-blue-600" />
                          Prevention Measures
                        </h4>
                        <ul className="space-y-2">
                          {alert.prevention.map((measure, index) => (
                            <li key={index} className="flex items-center space-x-2 text-gray-600">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span>{measure}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <Droplets className="h-4 w-4 mr-2 text-green-600" />
                          Ayurvedic Remedies
                        </h4>
                        <ul className="space-y-2">
                          {alert.ayurvedicRemedies.map((remedy, index) => (
                            <li key={index} className="flex items-center space-x-2 text-gray-600">
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
          <Card className="mt-12 border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Shield className="mr-2 h-5 w-5 text-green-600" />
                General Prevention Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Stay Hydrated</h4>
                <p className="text-sm text-gray-600">Drink 8-10 glasses of clean water daily. Add lemon or mint for better immunity.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Boost Immunity</h4>
                <p className="text-sm text-gray-600">Regular exercise, adequate sleep, and Ayurvedic herbs like Ashwagandha and Amla.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Early Detection</h4>
                <p className="text-sm text-gray-600">Monitor symptoms closely and consult healthcare providers at first signs of illness.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
