import { CourseCard } from "@/components/CourseCard";
import { ProgressBar } from "@/components/ProgressBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  Award,
  ArrowRight
} from "lucide-react";
import { mockCourses, mockEnrollments, getCurrentUser } from "@/data/mockData";
import fitnessHero from "@/assets/fitness-hero.jpg";

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const user = getCurrentUser();
  const userEnrollments = mockEnrollments.filter(e => e.userId === user.id);
  const enrolledCourseIds = userEnrollments.map(e => e.courseId);
  const enrolledCourses = mockCourses.filter(c => enrolledCourseIds.includes(c.id));
  const recommendedCourses = mockCourses.filter(c => !enrolledCourseIds.includes(c.id)).slice(0, 3);

  const totalProgress = userEnrollments.length > 0 
    ? userEnrollments.reduce((acc, e) => acc + e.overallProgress, 0) / userEnrollments.length 
    : 0;

  const completedCourses = userEnrollments.filter(e => e.overallProgress === 100).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-hero overflow-hidden">
        <img 
          src={fitnessHero} 
          alt="Fitness motivation" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome back, {user.name}!
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Ready to continue your fitness journey?
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-accent"
              onClick={() => onNavigate?.('courses')}
            >
              Explore Courses
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                  <p className="text-2xl font-bold text-primary">{userEnrollments.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
                  <p className="text-2xl font-bold text-secondary">{Math.round(totalProgress)}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-success">{completedCourses}</p>
                </div>
                <Award className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Week Streak</p>
                  <p className="text-2xl font-bold text-accent">12</p>
                </div>
                <Target className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Progress */}
        {userEnrollments.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Progress</h2>
              <Button 
                variant="outline" 
                onClick={() => onNavigate?.('progress')}
              >
                View All Progress
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {userEnrollments.slice(0, 2).map((enrollment) => {
                const course = mockCourses.find(c => c.id === enrollment.courseId);
                if (!course) return null;
                
                return (
                  <ProgressBar
                    key={enrollment.id}
                    title={course.title}
                    currentWeek={enrollment.currentWeek}
                    totalWeeks={course.weeks}
                    completedWeeks={enrollment.completedWeeks}
                    currentProgress={enrollment.currentWeekProgress}
                    overallProgress={enrollment.overallProgress}
                    nextMilestone="Complete strength assessment"
                    timeRemaining={`${course.weeks - enrollment.currentWeek} weeks`}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* Continue Learning */}
        {enrolledCourses.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Continue Learning</h2>
              <Button 
                variant="outline"
                onClick={() => onNavigate?.('courses')}
              >
                My Enrollments
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.slice(0, 3).map((course) => {
                const enrollment = userEnrollments.find(e => e.courseId === course.id);
                return (
                  <CourseCard
                    key={course.id}
                    {...course}
                    isEnrolled={true}
                    progress={enrollment?.overallProgress}
                    onViewCourse={(courseId) => console.log('View course:', courseId)}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* Recommended Courses */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recommended for You</h2>
            <Button 
              variant="outline"
              onClick={() => onNavigate?.('courses')}
            >
              Browse All Courses
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                onEnroll={(courseId) => console.log('Enroll in:', courseId)}
                onViewCourse={(courseId) => console.log('View course:', courseId)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};