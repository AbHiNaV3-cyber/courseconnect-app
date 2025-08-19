import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  BookOpen, 
  TrendingUp, 
  User, 
  Settings,
  Menu,
  X 
} from "lucide-react";

interface NavigationProps {
  userRole?: 'admin' | 'coach' | 'user';
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export const Navigation = ({ userRole = 'user', currentPage = 'dashboard', onNavigate }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'progress', label: 'My Progress', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  if (userRole === 'admin') {
    navItems.push({ id: 'admin', label: 'Admin Panel', icon: Settings });
  }

  if (userRole === 'coach') {
    navItems.push({ id: 'coach', label: 'Coach Panel', icon: Settings });
  }

  return (
    <nav className="bg-gradient-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              FitTracker
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onNavigate?.(item.id)}
                  className={isActive ? "shadow-primary" : ""}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      onNavigate?.(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`justify-start ${isActive ? "shadow-primary" : ""}`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};