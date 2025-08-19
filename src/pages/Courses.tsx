import { useState } from "react";
import { CourseCard } from "@/components/CourseCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter,
  BookOpen,
  Star,
  Users
} from "lucide-react";
import { mockCourses, mockEnrollments, getCurrentUser } from "@/data/mockData";

interface CoursesProps {
  onNavigate?: (page: string) => void;
}

export const Courses = ({ onNavigate }: CoursesProps) => {
  const user = getCurrentUser();
  const userEnrollments = mockEnrollments.filter(e => e.userId === user.id);
  const enrolledCourseIds = userEnrollments.map(e => e.courseId);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const categories = ["All", ...Array.from(new Set(mockCourses.map(c => c.category)))];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleEnroll = (courseId: string) => {
    console.log('Enrolling in course:', courseId);
    // In real app, this would call the backend API
  };

  const handleViewCourse = (courseId: string) => {
    console.log('Viewing course:', courseId);
    // In real app, this would navigate to course details
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Fitness Courses
          </h1>
          <p className="text-xl mb-8 text-white/90">
            Discover expert-led courses to transform your fitness journey
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search courses, instructors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Banner */}
        <Card className="mb-8 bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-3">
                <BookOpen className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{mockCourses.length}</div>
                  <div className="text-sm text-muted-foreground">Total Courses</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <Users className="w-8 h-8 text-secondary" />
                <div>
                  <div className="text-2xl font-bold">5,873</div>
                  <div className="text-sm text-muted-foreground">Active Students</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <Star className="w-8 h-8 text-accent" />
                <div>
                  <div className="text-2xl font-bold">4.8</div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-8 bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Filter className="w-5 h-5 text-primary" />
              <span className="font-semibold">Filter Courses</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Difficulty Level</label>
                <div className="flex flex-wrap gap-2">
                  {levels.map(level => (
                    <Badge
                      key={level}
                      variant={selectedLevel === level ? "default" : "outline"}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setSelectedLevel(level)}
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Results */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {filteredCourses.length} Course{filteredCourses.length !== 1 ? 's' : ''} Found
          </h2>
          <p className="text-muted-foreground">
            {searchTerm && `Results for "${searchTerm}"`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {selectedLevel !== "All" && ` • ${selectedLevel} level`}
          </p>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const enrollment = userEnrollments.find(e => e.courseId === course.id);
              const isEnrolled = enrolledCourseIds.includes(course.id);
              
              return (
                <CourseCard
                  key={course.id}
                  {...course}
                  isEnrolled={isEnrolled}
                  progress={enrollment?.overallProgress}
                  onEnroll={handleEnroll}
                  onViewCourse={handleViewCourse}
                />
              );
            })}
          </div>
        ) : (
          <Card className="p-12 text-center bg-gradient-card shadow-card">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedLevel("All");
              }}
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};