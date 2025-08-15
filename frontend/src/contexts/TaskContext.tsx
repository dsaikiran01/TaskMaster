import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, CreateTaskData, UpdateTaskData, FilterOptions } from '../types/index.ts';
import apiService from '../services/api.ts';
import { useAuth } from './AuthContext.tsx';

interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  filters: FilterOptions;
  createTask: (data: CreateTaskData) => Promise<void>;
  updateTask: (id: string, data: UpdateTaskData) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  setFilters: (filters: FilterOptions) => void;
  clearFilters: () => void;
  refreshTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});
  
  const { isAuthenticated } = useAuth();

  const fetchTasks = async () => {
    if (!isAuthenticated) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiService.getTasks(filters);
      setTasks(response.tasks);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters, isAuthenticated]);

  const createTask = async (data: CreateTaskData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiService.createTask(data);
      setTasks(prev => [response.task, ...prev]);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to create task');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id: string, data: UpdateTaskData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiService.updateTask(id, data);
      setTasks(prev => prev.map(task => 
        task._id === id ? response.task : task
      ));
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update task');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await apiService.deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to delete task');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTask = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiService.toggleTask(id);
      setTasks(prev => prev.map(task => 
        task._id === id ? response.task : task
      ));
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to toggle task');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const refreshTasks = async () => {
    await fetchTasks();
  };

  const value: TaskContextType = {
    tasks,
    isLoading,
    error,
    filters,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    setFilters: updateFilters,
    clearFilters,
    refreshTasks,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
