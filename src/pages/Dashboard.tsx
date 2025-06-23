
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  Heart, 
  Brain, 
  Activity, 
  Droplets, 
  Moon, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  Target,
  Clock,
  Award,
  Bell
} from "lucide-react";
import { Link } from "react-router-dom";

interface HealthMetric {
  date: string;
  value: number;
}

interface HealthAlert {
  id: string;
  type: 'warning' | 'info' | 'success';
  message: string;
  action?: string;
}

const Dashboard = () => {
  const [healthScore, setHealthScore] = useState(78);
  const [alerts, setAlerts] = useState<HealthAlert[]>([]);
  const [weeklyData, setWeeklyData] = useState<HealthMetric[]>([]);

  useEffect(() => {
    // Simulate data loading
    setAlerts([
      {
        id: '1',
        type: 'warning',
        message: "You haven't logged your water intake for 2 days",
        action: "Log Water Intake"
      },
      {
        id: '2',
        type: 'info',
        message: "Your next consultation with Dr. Priya is in 3 days",
        action: "View Details"
      },
      {
        id: '3',
        type: 'success',
        message: "Congratulations! You've completed 7 days of meditation streak",
        action: "Continue Streak"
      }
    ]);

    setWeeklyData([
      { date: 'Mon', value: 75 },
      { date: 'Tue', value: 78 },
      { date: 'Wed', value: 72 },
      { date: 'Thu', value: 80 },
      { date: 'Fri', value: 77 },
      { date: 'Sat', value: 82 },
      { date: 'Sun', value: 78 }
    ]);
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'success': return <Award className="h-4 w-4 text-green-600" />;
      default: return <Bell className="h-4 w-4 text-blue-600" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-orange-200 bg-orange-50';
      case 'success': return 'border-green-200 bg-green-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Activity className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">AyurGen - Wellness Dashboard</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Wellness Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Welcome back! Here's your personalized health overview for today.
            </p>
          </div>

          {/* Health Score & Quick Stats */}
          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            <Card className="lg:col-span-2 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Overall Health Score</span>
                </CardTitle>
                <CardDescription>Based on your recent activities and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-8 border-gray-200 relative">
                      <div 
                        className="absolute inset-0 rounded-full border-8 border-blue-500 border-t-transparent"
                        style={{ 
                          transform: `rotate(${(healthScore / 100) * 360}deg)`,
                          transition: 'transform 1s ease-in-out'
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-800">{healthScore}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Good Health Status</h3>
                    <p className="text-gray-600 mb-3">Your health metrics show positive trends. Keep up the great work!</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-green-100 text-green-800">Hydration: Good</Badge>
                      <Badge className="bg-blue-100 text-blue-800">Sleep: Average</Badge>
                      <Badge className="bg-orange-100 text-orange-800">Exercise: Needs Attention</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">2.1L</h3>
                <p className="text-gray-600 mb-2">Water Intake Today</p>
                <Progress value={70} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">Goal: 3L per day</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Moon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">7h 20m</h3>
                <p className="text-gray-600 mb-2">Sleep Last Night</p>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">Quality: Good</p>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Trend & Alerts */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <Card className="lg:col-span-2 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Weekly Health Trend</span>
                </CardTitle>
                <CardDescription>Your health score progression over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-orange-600" />
                  <span>Health Alerts</span>
                </CardTitle>
                <CardDescription>Important updates and reminders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                    <div className="flex items-start space-x-2">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{alert.message}</p>
                        {alert.action && (
                          <Button variant="link" className="p-0 h-auto text-xs mt-1">
                            {alert.action}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Daily Activities & Recommendations */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <span>Today's Goals</span>
                </CardTitle>
                <CardDescription>Track your daily wellness objectives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Drink 3L water</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={70} className="w-20 h-2" />
                    <span className="text-sm text-gray-600">70%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>30 min meditation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={100} className="w-20 h-2" />
                    <span className="text-sm text-gray-600">✓</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>45 min exercise</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={0} className="w-20 h-2" />
                    <span className="text-sm text-gray-600">0%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Take Ashwagandha</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={50} className="w-20 h-2" />
                    <span className="text-sm text-gray-600">1/2</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <span>AI Recommendations</span>
                </CardTitle>
                <CardDescription>Personalized suggestions based on your data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-1">Excellent Sleep Pattern!</h4>
                  <p className="text-sm text-green-700">Your sleep quality has improved by 15% this week. Consider maintaining your current bedtime routine.</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-1">Hydration Reminder</h4>
                  <p className="text-sm text-orange-700">You're 900ml behind your daily water goal. Try setting hourly reminders.</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-1">Dosha Balance</h4>
                  <p className="text-sm text-blue-700">Based on your Vata constitution, try warm herbal teas and gentle yoga today.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities & Quick Actions */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <span>Recent Activities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-green-100 text-green-700 text-xs">✓</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Completed meditation</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">💊</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Took morning supplements</p>
                    <p className="text-xs text-gray-500">8 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">📊</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Logged symptoms</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/symptom-checker">
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="mr-2 h-4 w-4" />
                    Check Symptoms
                  </Button>
                </Link>
                <Link to="/nutrition">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="mr-2 h-4 w-4" />
                    Plan Meals
                  </Button>
                </Link>
                <Link to="/consultation">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Consultation
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Upcoming</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Consultation with Dr. Priya</p>
                    <p className="text-xs text-gray-500">Dec 28, 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Pranayama session reminder</p>
                    <p className="text-xs text-gray-500">Tomorrow, 7:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Supplement refill due</p>
                    <p className="text-xs text-gray-500">In 3 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
