
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Gift,
  Flame,
  Star,
  Coins,
  Clock,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { toast } from "sonner";

const DailyClaimCard = () => {
  const { 
    userStats, 
    todaysClaim, 
    canClaimDaily, 
    isClaimingDaily, 
    claimDaily 
  } = useDashboardData();

  const handleClaimDaily = async () => {
    try {
      const claim = await claimDaily();
      toast.success(`🎉 Daily reward claimed! +${claim.points_claimed} points`, {
        description: `Streak: ${claim.streak_days} days • Bonus: ${Math.round((claim.bonus_multiplier - 1) * 100)}%`
      });
    } catch (error) {
      toast.error("Failed to claim daily reward. Please try again.");
    }
  };

  const currentStreak = userStats?.daily_streak || 0;
  const nextMilestone = Math.ceil((currentStreak + 1) / 7) * 7;
  const progressToNextMilestone = ((currentStreak % 7) / 7) * 100;

  return (
    <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-yellow-950/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 rounded-full animate-pulse delay-1000"></div>
      </div>

      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Daily Rewards
              </h3>
              <CardDescription className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                {currentStreak} day streak
              </CardDescription>
            </div>
          </div>
          
          {todaysClaim && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Claimed
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        {canClaimDaily ? (
          <div className="text-center space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-800">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Coins className="h-8 w-8 text-amber-600" />
                <span className="text-3xl font-bold text-amber-700">
                  {Math.floor(50 * (1 + Math.min(currentStreak * 0.1, 2)))}
                </span>
                <span className="text-lg text-amber-600">points</span>
              </div>
              
              {currentStreak > 0 && (
                <div className="flex items-center justify-center gap-2 text-sm text-amber-600">
                  <Sparkles className="h-4 w-4" />
                  <span>
                    +{Math.round(Math.min(currentStreak * 10, 200))}% streak bonus
                  </span>
                </div>
              )}
            </div>

            <Button
              onClick={handleClaimDaily}
              disabled={isClaimingDaily}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isClaimingDaily ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Claiming...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Claim Daily Reward
                </div>
              )}
            </Button>
          </div>
        ) : todaysClaim ? (
          <div className="text-center space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span className="text-lg font-semibold text-green-700">
                  Already Claimed Today!
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Coins className="h-5 w-5 text-green-600" />
                <span className="text-xl font-bold text-green-700">
                  +{todaysClaim.points_claimed} points earned
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Come back tomorrow for your next reward</span>
            </div>
          </div>
        ) : null}
        
        {/* Streak Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Streak Progress</span>
            <span className="text-muted-foreground">
              {currentStreak} / {nextMilestone} days
            </span>
          </div>
          
          <Progress 
            value={progressToNextMilestone} 
            className="h-3 bg-amber-100 dark:bg-amber-900/30"
          />
          
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Star className="h-3 w-3" />
            <span>
              {nextMilestone - currentStreak} days until next milestone bonus
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyClaimCard;
