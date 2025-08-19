import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '@/services/api';
import { Course, Enrollment, ProgressEntry } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

// Courses
export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: apiService.getCourses,
  });
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => apiService.getCourse(id),
    enabled: !!id,
  });
};

// Enrollments
export const useMyEnrollments = () => {
  return useQuery({
    queryKey: ['myEnrollments'],
    queryFn: apiService.getMyEnrollments,
  });
};

export const useEnrollment = (id: string) => {
  return useQuery({
    queryKey: ['enrollment', id],
    queryFn: () => apiService.getEnrollment(id),
    enabled: !!id,
  });
};

// Progress
export const useProgress = (enrollmentId: string) => {
  return useQuery({
    queryKey: ['progress', enrollmentId],
    queryFn: () => apiService.getProgress(enrollmentId),
    enabled: !!enrollmentId,
  });
};

// Mutations
export const useEnrollMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: apiService.enroll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myEnrollments'] });
      toast({
        title: "Enrollment Successful",
        description: "You've been enrolled in the course!",
      });
    },
    onError: (error) => {
      toast({
        title: "Enrollment Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useRecordProgressMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: apiService.recordProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] });
      queryClient.invalidateQueries({ queryKey: ['myEnrollments'] });
      toast({
        title: "Progress Recorded",
        description: "Your progress has been updated!",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to Record Progress",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Coach hooks
export const useCoachCourses = () => {
  return useQuery({
    queryKey: ['coachCourses'],
    queryFn: apiService.getCoachCourses,
  });
};

export const useCourseEnrollments = (courseId: string) => {
  return useQuery({
    queryKey: ['courseEnrollments', courseId],
    queryFn: () => apiService.getCourseEnrollments(courseId),
    enabled: !!courseId,
  });
};

// Admin hooks
export const useAllUsers = () => {
  return useQuery({
    queryKey: ['allUsers'],
    queryFn: apiService.getAllUsers,
  });
};

export const useAllEnrollments = () => {
  return useQuery({
    queryKey: ['allEnrollments'],
    queryFn: apiService.getAllEnrollments,
  });
};