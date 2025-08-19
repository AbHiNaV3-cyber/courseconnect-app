import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Users, 
  Star, 
  Trophy,
  CheckCircle 
} from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  studentsCount: number;
  progress?: number;
  isEnrolled?: boolean;
  category: string;
  onEnroll?: (courseId: string) => void;
  onViewCourse?: (courseId: string) => void;
}

export const CourseCard = ({
  id,
  title,
  description,
  instructor,
  duration,
  level,
  rating,
  studentsCount,
  progress,
  isEnrolled = false,
  category,
  onEnroll,
  onViewCourse
}: CourseCardProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-secondary text-secondary-foreground';
      case 'Intermediate': return 'bg-accent text-accent-foreground';
      case 'Advanced': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-primary transition-all duration-300 hover:scale-105 group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        
        <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Instructor</span>
            <span className="font-medium">{instructor}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{studentsCount}</span>
            </div>
            
            <Badge className={getLevelColor(level)} variant="secondary">
              {level}
            </Badge>
          </div>

          {isEnrolled && typeof progress === 'number' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <div className="flex items-center space-x-2 w-full">
          {isEnrolled ? (
            <>
              <Button 
                variant="default" 
                className="flex-1 shadow-primary"
                onClick={() => onViewCourse?.(id)}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Continue Course
              </Button>
              {progress === 100 && (
                <div className="flex items-center text-success">
                  <Trophy className="w-5 h-5" />
                </div>
              )}
            </>
          ) : (
            <Button 
              variant="outline" 
              className="flex-1 hover:bg-primary hover:text-primary-foreground hover:shadow-primary transition-all"
              onClick={() => onEnroll?.(id)}
            >
              Enroll Now
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};