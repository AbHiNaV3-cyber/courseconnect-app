export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  studentsCount: number;
  category: string;
  weeks: number;
}

export interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  enrolledAt: string;
  currentWeek: number;
  completedWeeks: number;
  overallProgress: number;
  currentWeekProgress: number;
}

export interface ProgressEntry {
  id: string;
  enrollmentId: string;
  weekNumber: number;
  completed: boolean;
  notes: string;
  completedAt?: string;
}

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "HIIT Fundamentals",
    description: "Master the basics of High-Intensity Interval Training with progressive workouts designed for maximum fat burn and cardiovascular health.",
    instructor: "Sarah Mitchell",
    duration: "8 weeks",
    level: "Beginner",
    rating: 4.8,
    studentsCount: 1247,
    category: "Cardio",
    weeks: 8
  },
  {
    id: "2", 
    title: "Strength Training Mastery",
    description: "Complete strength training program focusing on compound movements, progressive overload, and building lean muscle mass.",
    instructor: "Marcus Johnson",
    duration: "12 weeks",
    level: "Intermediate",
    rating: 4.9,
    studentsCount: 892,
    category: "Strength",
    weeks: 12
  },
  {
    id: "3",
    title: "Advanced Powerlifting",
    description: "Elite powerlifting techniques, competition preparation, and advanced programming for serious strength athletes.",
    instructor: "Elena Rodriguez",
    duration: "16 weeks",
    level: "Advanced",
    rating: 4.7,
    studentsCount: 324,
    category: "Powerlifting",
    weeks: 16
  },
  {
    id: "4",
    title: "Yoga Flow for Athletes",
    description: "Flexibility, mobility, and recovery-focused yoga sequences specifically designed for athletic performance enhancement.",
    instructor: "Priya Sharma",
    duration: "6 weeks",
    level: "Beginner",
    rating: 4.6,
    studentsCount: 756,
    category: "Flexibility",
    weeks: 6
  },
  {
    id: "5",
    title: "Nutrition & Meal Prep",
    description: "Comprehensive nutrition guide with practical meal preparation strategies for optimal fitness results and sustainable habits.",
    instructor: "Dr. James Chen",
    duration: "4 weeks",
    level: "Beginner",
    rating: 4.8,
    studentsCount: 1456,
    category: "Nutrition",
    weeks: 4
  },
  {
    id: "6",
    title: "CrossFit Competitive Training",
    description: "Advanced CrossFit programming for competitive athletes, including Olympic lifting technique and metabolic conditioning.",
    instructor: "Alex Thompson",
    duration: "20 weeks",
    level: "Advanced",
    rating: 4.9,
    studentsCount: 198,
    category: "CrossFit",
    weeks: 20
  }
];

export const mockEnrollments: Enrollment[] = [
  {
    id: "e1",
    courseId: "1",
    userId: "user1",
    enrolledAt: "2024-01-15",
    currentWeek: 3,
    completedWeeks: 2,
    overallProgress: 25,
    currentWeekProgress: 60
  },
  {
    id: "e2",
    courseId: "4",
    userId: "user1", 
    enrolledAt: "2024-01-10",
    currentWeek: 5,
    completedWeeks: 4,
    overallProgress: 83,
    currentWeekProgress: 100
  },
  {
    id: "e3",
    courseId: "5",
    userId: "user1",
    enrolledAt: "2024-02-01",
    currentWeek: 2,
    completedWeeks: 1,
    overallProgress: 50,
    currentWeekProgress: 25
  }
];

export const mockProgressEntries: ProgressEntry[] = [
  {
    id: "p1",
    enrollmentId: "e1",
    weekNumber: 1,
    completed: true,
    notes: "Great start! Completed all workouts as scheduled.",
    completedAt: "2024-01-22"
  },
  {
    id: "p2", 
    enrollmentId: "e1",
    weekNumber: 2,
    completed: true,
    notes: "Feeling stronger already. Increased intensity slightly.",
    completedAt: "2024-01-29"
  },
  {
    id: "p3",
    enrollmentId: "e1", 
    weekNumber: 3,
    completed: false,
    notes: "Currently in progress. Loving the variety of exercises."
  }
];

export const getUserRole = (): 'admin' | 'coach' | 'user' => {
  // Mock role - in real app would come from auth
  return 'user';
};

export const getCurrentUser = () => ({
  id: 'user1',
  name: 'John Doe',
  email: 'john@example.com',
  role: getUserRole()
});