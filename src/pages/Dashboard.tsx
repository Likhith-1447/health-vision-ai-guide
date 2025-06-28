
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
  Flame,
  Users,
  Zap,
  Star
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import HealthGamification from "@/components/HealthGamification";
import DailyClaimCard from "@/components/DailyClaimCard";
import ActivityFeed from "@/components/ActivityFeed";
import { useDashboardData } from "@/hooks/useDashboardData";
import { toast } from "sonner";

const Dashboard = () => {
  const { 
    userStats, 
    isLoadingStats, 
    logActivity, 
    isRealTimeConnected 
  } = useDashboardData();

  const handleQuickAction = async (actionType: string, actionData: any = {}) => {
    try {
      const points = actionType === 'water_intake' ? 5 : actionType === 'meditation' ? 15 : 10;
      
      await logActivity({
        user_id: '', // Will be set by the mutation
        activity_type: actionType,
        activity_data: actionData,
        points_earned: points,
        streak_count: 0
      });

      const actionNames = {
        water_intake: '💧 Water logged',
        meditation: '🧘 Meditation started',
        exercise: '💪 Exercise logged',
        symptom_check: '🩺 Symptoms checked'
      };

      toast.success(`${actionNames[actionType] || 'Activity logged'}! +${points} points`);
    } catch (error) {
      toast.error("Failed to log activity. Please try again.");
    }
  };

  const currentLevel = userStats?.current_level || 1;
  const totalPoints = userStats?.total_points || 0;
  const pointsToNextLevel = 500 - (totalPoints % 500);
  const levelProgress = ((totalPoints % 500) / 500) * 100;

  const healthMetrics = [
    { title: "Wellness Score", value: Math.min(95, 60 + (totalPoints / 50)), color: "bg-emerald-500" },
    { title: "Activity Level", value: Math.min(90, 40 + (userStats?.total_analyses || 0) * 5), color: "bg-blue-500" },
    { title: "Consistency", value: Math.min(100, (userStats?.daily_streak || 0) * 10), color: "bg-purple-500" },
    { title: "Engagement", value: Math.min(85, 50 + (userStats?.total_analyses || 0) * 3), color: "bg-orange-500" }
  ];

  const recentActivities = [
    { icon: Heart, activity: "Health Analysis", time: "2 hours ago", status: "completed" },
    { icon: Droplets, activity: "Water Intake", time: "4 hours ago", status: "completed" },
    { icon: Brain, activity: "Meditation", time: "6 hours ago", status: "completed" },
    { icon: Moon, activity: "Sleep Tracking", time: "1 day ago", status: "pending" }
  ];

  return (
    <div className="flex-1 overflow-auto">
      {/* Enhanced Header with real-time indicator */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="relative">
                <Activity className="h-7 w-7 text-primary" />
                {isRealTimeConnected && (
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  Health Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Level {currentLevel} • {totalPoints.toLocaleString()} points
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {isRealTimeConnected && (
              <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live
              </Badge>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          {/* Welcome Section with Level Progress */}
          <div className="mb-8 animate-fade-in">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl p-6 border border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Welcome back, Health Warrior! 🌟
                  </h2>
                  <p className="text-muted-foreground">
                    Continue your journey towards optimal wellness with personalized guidance.
                  </p>
                </div>
                
                <div className="text-right min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="text-xl font-bold">Level {currentLevel}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {pointsToNextLevel} points to level {currentLevel + 1}
                  </div>
                  <Progress value={levelProgress} className="h-2 w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid - Enhanced with real data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { 
                title: "Daily Streak", 
                value: `${userStats?.daily_streak || 0} days`, 
                icon: Flame, 
                color: "text-orange-500",
                loading: isLoadingStats
              },
              { 
                title: "Total Points", 
                value: totalPoints.toLocaleString(), 
                icon: Star, 
                color: "text-yellow-500",
                loading: isLoadingStats
              },
              { 
                title: "Health Analyses", 
                value: `${userStats?.total_analyses || 0}`, 
                icon: Heart, 
                color: "text-red-500",
                loading: isLoadingStats
              },
              { 
                title: "Current Level", 
                value: `Level ${currentLevel}`, 
                icon: Award, 
                color: "text-purple-500",
                loading: isLoadingStats
              }
            ].map((stat, index) => (
              <Card key={stat.title} className="animate-scale-in border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                  {stat.loading ? (
                    <div className="space-y-2">
                      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.title}</div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Daily Claim and Activity Feed */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-1">
              <DailyClaimCard />
            </div>
            <div className="lg:col-span-2">
              <ActivityFeed />
            </div>
          </div>

          {/* Health Metrics */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card className="animate-fade-in border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Health Metrics
                </CardTitle>
                <CardDescription>Your current wellness indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {healthMetrics.map((metric, index) => (
                  <div key={metric.title} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.title}</span>
                      <span className="text-sm text-muted-foreground">{Math.round(metric.value)}%</span>
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
                  Today's Goals
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

          {/* Enhanced Gamification Section */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <HealthGamification />
          </div>

          {/* Quick Actions with Real Functionality */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {[
              { 
                title: "Log Water", 
                description: "Track your daily hydration",
                action: () => handleQuickAction('water_intake', { amount: 250, unit: 'ml' }),
                icon: Droplets,
                color: "from-blue-500 to-cyan-500"
              },
              { 
                title: "Start Meditation", 
                description: "Begin mindfulness practice",
                action: () => handleQuickAction('meditation', { duration: 10 }),
                icon: Brain,
                color: "from-purple-500 to-pink-500"
              },
              { 
                title: "Log Exercise", 
                description: "Record your workout",
                action: () => handleQuickAction('exercise', { type: 'general', duration: 30 }),
                icon: Heart,
                color: "from-red-500 to-orange-500"
              },
              { 
                title: "Health Check", 
                description: "Quick symptom assessment",
                action: () => handleQuickAction('symptom_check', { type: 'quick_check' }),
                icon: Users,
                color: "from-green-500 to-emerald-500"
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
