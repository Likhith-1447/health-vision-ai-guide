
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Activity, 
  Heart, 
  Brain, 
  Target, 
  TrendingUp, 
  Award,
  Calendar,
  Droplets,
  Moon,
  Flame
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import HealthGamification from "@/components/HealthGamification";

const Dashboard = () => {
  const [waterIntake, setWaterIntake] = useState(6);
  const [meditationMinutes, setMeditationMinutes] = useState(15);
  
  const healthMetrics = [
    { title: "Vata Balance", value: 75, color: "bg-blue-500" },
    { title: "Pitta Balance", value: 85, color: "bg-red-500" },
    { title: "Kapha Balance", value: 70, color: "bg-green-500" },
    { title: "Overall Wellness", value: 80, color: "bg-purple-500" }
  ];

  const recentActivities = [
    { icon: Heart, activity: "Morning Yoga", time: "7:00 AM", status: "completed" },
    { icon: Droplets, activity: "Ayurvedic Tea", time: "9:30 AM", status: "completed" },
    { icon: Brain, activity: "Meditation", time: "6:00 PM", status: "pending" },
    { icon: Moon, activity: "Evening Routine", time: "9:00 PM", status: "pending" }
  ];

  return (
    <div className="flex-1 overflow-auto">
      {/* Enhanced Header with theme toggle */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="relative">
                <Activity className="h-7 w-7 text-primary" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  Health Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Track your Ayurvedic wellness journey
                </p>
              </div>
            </div>
          </div>
          
          {/* Theme Toggle in Header */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl p-6 border border-primary/20">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Welcome back, Health Warrior! 🌟
              </h2>
              <p className="text-muted-foreground">
                Continue your journey towards optimal wellness with personalized Ayurvedic guidance.
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { title: "Daily Streak", value: "12 days", icon: Flame, color: "text-orange-500" },
              { title: "Wellness Score", value: "85%", icon: Target, color: "text-green-500" },
              { title: "Consultations", value: "3", icon: Heart, color: "text-red-500" },
              { title: "Goals Achieved", value: "7/10", icon: Award, color: "text-purple-500" }
            ].map((stat, index) => (
              <Card key={stat.title} className="animate-scale-in border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.title}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Health Metrics */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card className="animate-fade-in border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Dosha Balance
                </CardTitle>
                <CardDescription>Your current Ayurvedic constitution balance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {healthMetrics.map((metric, index) => (
                  <div key={metric.title} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.title}</span>
                      <span className="text-sm text-muted-foreground">{metric.value}%</span>
                    </div>
                    <Progress 
                      value={metric.value} 
                      className="h-3"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="animate-fade-in border-0 shadow-lg" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Today's Activities
                </CardTitle>
                <CardDescription>Your personalized wellness routine</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <activity.icon className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-sm">{activity.activity}</div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                    </div>
                    <Badge 
                      variant={activity.status === "completed" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Gamification Section */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <HealthGamification />
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {[
              { 
                title: "Log Water Intake", 
                description: "Track your daily hydration",
                action: () => setWaterIntake(prev => prev + 1),
                icon: Droplets,
                color: "from-blue-500 to-cyan-500"
              },
              { 
                title: "Start Meditation", 
                description: "Begin your mindfulness practice",
                action: () => setMeditationMinutes(prev => prev + 5),
                icon: Brain,
                color: "from-purple-500 to-pink-500"
              },
              { 
                title: "Check Symptoms", 
                description: "Analyze your current health",
                action: () => {},
                icon: Heart,
                color: "from-red-500 to-orange-500"
              }
            ].map((action, index) => (
              <Card key={action.title} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto h-12 w-12 rounded-xl bg-gradient-to-r ${action.color} p-3 mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                  <Button 
                    onClick={action.action}
                    className="w-full"
                    variant="outline"
                  >
                    Start Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
