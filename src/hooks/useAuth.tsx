import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import apiService from '@/services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'coach' | 'user';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        apiService.setAuthToken(token);
        const userData = await apiService.getCurrentUser() as User;
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('authToken');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      
      // For Basic Auth (development)
      if (import.meta.env.VITE_AUTH_TYPE === 'basic') {
        apiService.setBasicAuth(username, password);
        const userData = await apiService.getCurrentUser() as User;
        setUser(userData);
        // Store credentials for basic auth
        localStorage.setItem('basicAuthCredentials', btoa(`${username}:${password}`));
      } else {
        // For JWT Auth (production)
        const authResponse = await apiService.login(username, password) as { token: string; user: User };
        const { token, user: userData } = authResponse;
        
        apiService.setAuthToken(token);
        setUser(userData);
        localStorage.setItem('authToken', token);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('basicAuthCredentials');
    // Reset API service headers
    apiService.setAuthToken('');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};