export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  isCompleted: boolean;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  userId: string;
  createdAt: string;
  updatedAt: string;
  isOverdue?: boolean;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface TaskResponse {
  count: number;
  tasks: Task[];
}

export interface CreateTaskData {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  isCompleted?: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData extends LoginData {
  name: string;
}

export interface FilterOptions {
  completed?: boolean;
  tag?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export interface ApiError {
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
