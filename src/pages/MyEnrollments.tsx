import { CourseCard } from "@/components/CourseCard";
import { ProgressBar } from "@/components/ProgressBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  TrendingUp, 
  Calendar,
  Target,
  Award,
  Clock
} from "lucide-react";
import { mockCourses, mockEnrollments, mockProgressEntries, getCurrentUser } from "@/data/mockData";

interface MyEnrollmentsProps {
  onNavigate?: (page: string) => void;
}

export const MyEnrollments = ({ onNavigate }: MyEnrollmentsProps) => {
  const user = getCurrentUser();
  const userEnrollments = mockEnrollments.filter(e => e.userId === user.id);
  const enrolledCourses = mockCourses.filter(c => 
    userEnrollments.some(e => e.courseId === c.id)
  );

  const activeCourses = userEnrollments.filter(e => e.overallProgress < 100);
  const completedCourses = userEnrollments.filter(e => e.overallProgress === 100);
  
  const totalProgress = userEnrollments.length > 0 
    ? userEnrollments.reduce((acc, e) => acc + e.overallProgress, 0) / userEnrollments.length 
    : 0;

  const handleViewCourse = (courseId: string) => {
    console.log('Viewing course:', courseId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (userEnrollments.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto p-12 text-center bg-gradient-card shadow-card">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-4">No Enrollments Yet</h2>
            <p className="text-muted-foreground mb-8">
              Start your fitness journey by enrolling in your first course
            </p>
            <Button 
              size="lg" 
              className="shadow-primary"
              onClick={() => onNavigate?.('courses')}
            >
              Browse Courses
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My Learning Journey
          </h1>
          <p className="text-xl text-white/90">
            Track your progress and continue your fitness education
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Enrolled</p>
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
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-accent">{activeCourses.length}</p>
                </div>
                <Clock className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-success">{completedCourses.length}</p>
                </div>
                <Award className="w-8 h-8 text-success" />
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
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Learning Progress</span>
                <span className="font-medium">{Math.round(totalProgress)}%</span>
              </div>
              <Progress value={totalProgress} className="h-3" />
            </div>
            <p className="text-sm text-muted-foreground">
              Keep up the great work! You're making excellent progress on your fitness journey.
            </p>
          </CardContent>
        </Card>

        {/* Active Courses */}
        {activeCourses.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-accent" />
              Continue Learning ({activeCourses.length})
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {activeCourses.slice(0, 2).map((enrollment) => {
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
                    nextMilestone="Complete weekly assessment"
                    timeRemaining={`${course.weeks - enrollment.currentWeek} weeks`}
                  />
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.filter(course => {
                const enrollment = userEnrollments.find(e => e.courseId === course.id);
                return enrollment && enrollment.overallProgress < 100;
              }).map((course) => {
                const enrollment = userEnrollments.find(e => e.courseId === course.id);
                return (
                  <CourseCard
                    key={course.id}
                    {...course}
                    isEnrolled={true}
                    progress={enrollment?.overallProgress}
                    onViewCourse={handleViewCourse}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* Completed Courses */}
        {completedCourses.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-success" />
              Completed Courses ({completedCourses.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.filter(course => {
                const enrollment = userEnrollments.find(e => e.courseId === course.id);
                return enrollment && enrollment.overallProgress === 100;
              }).map((course) => {
                const enrollment = userEnrollments.find(e => e.courseId === course.id);
                return (
                  <div key={course.id} className="relative">
                    <CourseCard
                      {...course}
                      isEnrolled={true}
                      progress={100}
                      onViewCourse={handleViewCourse}
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-success text-success-foreground">
                        <Award className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Enrollment History */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-primary" />
            Enrollment History
          </h2>
          
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {userEnrollments.map((enrollment) => {
                  const course = mockCourses.find(c => c.id === enrollment.courseId);
                  if (!course) return null;
                  
                  return (
                    <div key={enrollment.id} className="p-6 hover:bg-muted/20 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Enrolled on {formatDate(enrollment.enrolledAt)}
                          </p>
                          <div className="flex items-center space-x-4">
                            <Badge variant="outline">
                              Week {enrollment.currentWeek} of {course.weeks}
                            </Badge>
                            <div className="flex items-center space-x-2">
                              <Progress value={enrollment.overallProgress} className="w-24 h-2" />
                              <span className="text-sm font-medium">{enrollment.overallProgress}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewCourse(course.id)}
                        >
                          {enrollment.overallProgress === 100 ? 'Review' : 'Continue'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};