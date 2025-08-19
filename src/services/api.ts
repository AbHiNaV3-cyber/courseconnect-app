import { Course, Enrollment, ProgressEntry } from '@/data/mockData';

// Configuration
const API_BASE_URL = import.meta.env.VITE_CAP_API_URL || 'http://localhost:4004';
const API_PATH = '/api/fitness';

class ApiService {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor() {
    this.baseUrl = `${API_BASE_URL}${API_PATH}`;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  // Set authentication token
  setAuthToken(token: string) {
    this.headers = {
      ...this.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  // Set basic auth credentials
  setBasicAuth(username: string, password: string) {
    const credentials = btoa(`${username}:${password}`);
    this.headers = {
      ...this.headers,
      'Authorization': `Basic ${credentials}`,
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: this.headers,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.value || data; // Handle OData response format
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Authentication
  async login(username: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async getCurrentUser() {
    return this.request('/me');
  }

  // Courses
  async getCourses(): Promise<Course[]> {
    return this.request('/Courses');
  }

  async getCourse(id: string): Promise<Course> {
    return this.request(`/Courses(${id})`);
  }

  async createCourse(course: Omit<Course, 'id'>): Promise<Course> {
    return this.request('/Courses', {
      method: 'POST',
      body: JSON.stringify(course),
    });
  }

  async updateCourse(id: string, course: Partial<Course>): Promise<Course> {
    return this.request(`/Courses(${id})`, {
      method: 'PATCH',
      body: JSON.stringify(course),
    });
  }

  async deleteCourse(id: string): Promise<void> {
    return this.request(`/Courses(${id})`, {
      method: 'DELETE',
    });
  }

  // Enrollments
  async getMyEnrollments(): Promise<Enrollment[]> {
    return this.request('/MyEnrollments()');
  }

  async enroll(courseId: string): Promise<Enrollment> {
    return this.request('/Enroll', {
      method: 'POST',
      body: JSON.stringify({ courseID: courseId }),
    });
  }

  async getEnrollment(id: string): Promise<Enrollment> {
    return this.request(`/Enrollments(${id})`);
  }

  // Progress
  async getProgress(enrollmentId: string): Promise<ProgressEntry[]> {
    return this.request(`/Progress?$filter=enrollmentId eq '${enrollmentId}'`);
  }

  async recordProgress(data: {
    enrollmentID: string;
    weekNumber: number;
    completed: boolean;
    notes: string;
  }): Promise<ProgressEntry> {
    return this.request('/RecordProgress', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Coach specific endpoints
  async getCoachCourses(): Promise<Course[]> {
    return this.request('/CoachCourses()');
  }

  async getCourseEnrollments(courseId: string): Promise<Enrollment[]> {
    return this.request(`/Enrollments?$filter=courseId eq '${courseId}'&$expand=user`);
  }

  // Admin specific endpoints
  async getAllUsers() {
    return this.request('/Users');
  }

  async getAllEnrollments(): Promise<Enrollment[]> {
    return this.request('/Enrollments?$expand=course,user');
  }

  async updateUserRole(userId: string, role: string) {
    return this.request(`/Users(${userId})`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  }
}

export const apiService = new ApiService();
export default apiService;