import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Target, 
  CheckCircle,
  Clock
} from "lucide-react";

interface ProgressBarProps {
  title: string;
  currentWeek: number;
  totalWeeks: number;
  completedWeeks: number;
  currentProgress: number;
  overallProgress: number;
  nextMilestone?: string;
  timeRemaining?: string;
}

export const ProgressBar = ({
  title,
  currentWeek,
  totalWeeks,
  completedWeeks,
  currentProgress,
  overallProgress,
  nextMilestone,
  timeRemaining
}: ProgressBarProps) => {
  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary" />
            {title}
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            Week {currentWeek} of {totalWeeks}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Week Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Week Progress</span>
            <span className="font-medium">{currentProgress}%</span>
          </div>
          <Progress value={currentProgress} className="h-3" />
        </div>

        {/* Overall Course Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">{overallProgress}%</span>
          </div>
          <Progress 
            value={overallProgress} 
            className="h-3"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div className="text-lg font-bold text-success">{completedWeeks}</div>
            <div className="text-xs text-muted-foreground">Completed Weeks</div>
          </div>

          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Target className="w-5 h-5 text-accent" />
            </div>
            <div className="text-lg font-bold text-accent">{totalWeeks - completedWeeks}</div>
            <div className="text-xs text-muted-foreground">Weeks Remaining</div>
          </div>
        </div>

        {/* Next Milestone */}
        {nextMilestone && (
          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center text-sm font-medium text-primary mb-1">
              <Target className="w-4 h-4 mr-2" />
              Next Milestone
            </div>
            <p className="text-sm text-muted-foreground">{nextMilestone}</p>
          </div>
        )}

        {/* Time Remaining */}
        {timeRemaining && (
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            Estimated time remaining: {timeRemaining}
          </div>
        )}
      </CardContent>
    </Card>
  );
};