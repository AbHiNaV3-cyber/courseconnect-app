import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "./Dashboard";
import { Courses } from "./Courses";
import { MyEnrollments } from "./MyEnrollments";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Mail, 
  Lock,
  UserCheck,
  Shield,
  Settings
} from "lucide-react";
import { getCurrentUser, getUserRole } from "@/data/mockData";

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock login state
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const user = getCurrentUser();
  const userRole = getUserRole();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm shadow-card">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Welcome to FitTracker</h1>
              <p className="text-muted-foreground">Sign in to continue your fitness journey</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="pl-10"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full shadow-primary">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">Demo Roles:</p>
              <div className="flex flex-col space-y-2 text-xs">
                <div className="flex items-center justify-center space-x-2">
                  <UserCheck className="w-4 h-4 text-primary" />
                  <span>User: Browse & enroll in courses</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="w-4 h-4 text-secondary" />
                  <span>Coach: Manage courses & students</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Settings className="w-4 h-4 text-accent" />
                  <span>Admin: Full system access</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Profile/Admin/Coach Panel placeholder
  if (currentPage === 'profile' || currentPage === 'admin' || currentPage === 'coach') {
    const getPageConfig = () => {
      switch (currentPage) {
        case 'admin':
          return {
            title: 'Admin Panel',
            description: 'Manage users, courses, and system settings',
            icon: Settings,
            color: 'text-accent'
          };
        case 'coach':
          return {
            title: 'Coach Panel', 
            description: 'Manage your courses and track student progress',
            icon: Shield,
            color: 'text-secondary'
          };
        default:
          return {
            title: 'User Profile',
            description: 'Manage your account settings and preferences',
            icon: User,
            color: 'text-primary'
          };
      }
    };

    const config = getPageConfig();
    const Icon = config.icon;

    return (
      <div className="min-h-screen bg-background">
        <Navigation 
          userRole={userRole}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />
        
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto p-12 text-center bg-gradient-card shadow-card">
            <Icon className={`w-16 h-16 mx-auto mb-4 ${config.color}`} />
            <h2 className="text-2xl font-bold mb-2">{config.title}</h2>
            <p className="text-muted-foreground mb-8">{config.description}</p>
            <p className="text-sm text-muted-foreground mb-6">
              This panel will be implemented in future iterations with role-specific functionality.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => setCurrentPage('dashboard')}
              >
                Back to Dashboard
              </Button>
              <Button 
                variant="destructive"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Main App with Navigation
  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        userRole={userRole}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      
      {currentPage === 'dashboard' && <Dashboard onNavigate={setCurrentPage} />}
      {currentPage === 'courses' && <Courses onNavigate={setCurrentPage} />}
      {currentPage === 'progress' && <MyEnrollments onNavigate={setCurrentPage} />}
    </div>
  );
};

export default Index;
