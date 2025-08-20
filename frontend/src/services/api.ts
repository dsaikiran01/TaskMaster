import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type {
  AuthResponse,
  TaskResponse,
  Task,
  CreateTaskData,
  UpdateTaskData,
  LoginData,
  SignupData,
  FilterOptions,
  User
} from '../types/index.ts';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          // localStorage.removeItem('user');
          // Redirect to login page or home
          window.location.href = '/';
        }
        return Promise.reject(error);
      }
    );
  }

  // ✅ Add this method
  setToken(token: string | null) {
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.api.defaults.headers.common['Authorization'];
    }
  }

  // Authentication methods
  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/signup', data);
    return response.data;
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/login', data);
    return response.data;
  }

  // get user details
  async getCurrentUser(): Promise<User> {
  const response = await this.api.get<User>('/auth/me'); // or '/users/me' based on your backend
  return response.data;
}

  // Task methods
  async getTasks(filters?: FilterOptions): Promise<TaskResponse> {
    const params = new URLSearchParams();
    if (filters?.completed !== undefined) {
      params.append('completed', filters.completed.toString());
    }
    if (filters?.tag) {
      params.append('tag', filters.tag);
    }
    if (filters?.priority) {
      params.append('priority', filters.priority);
    }
    if (filters?.dueDate) {
      params.append('dueDate', filters.dueDate);
    }

    const response = await this.api.get<TaskResponse>(`/tasks?${params.toString()}`);
    return response.data;
  }

  async createTask(data: CreateTaskData): Promise<{ message: string; task: Task }> {
    const response = await this.api.post<{ message: string; task: Task }>('/tasks', data);
    return response.data;
  }

  async updateTask(id: string, data: UpdateTaskData): Promise<{ message: string; task: Task }> {
    const response = await this.api.put<{ message: string; task: Task }>(`/tasks/${id}`, data);
    return response.data;
  }

  async deleteTask(id: string): Promise<{ message: string; taskId: string }> {
    const response = await this.api.delete<{ message: string; taskId: string }>(`/tasks/${id}`);
    return response.data;
  }

  async toggleTask(id: string): Promise<{ message: string; task: Task }> {
    const response = await this.api.patch<{ message: string; task: Task }>(`/tasks/${id}/toggle`);
    return response.data;
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    const response = await this.api.get<{ status: string; message: string }>('/health');
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;
