/**
 * Represents a user of the application.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Represents a task assigned to a user.
 */
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

/**
 * Response returned after successful authentication.
 */
export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

/**
 * Response returned when fetching tasks.
 */
export interface TaskResponse {
  count: number;
  tasks: Task[];
}

/**
 * Data required to create a new task.
 */
export interface CreateTaskData {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}

/**
 * Data allowed when updating a task.
 */
export interface UpdateTaskData extends Partial<CreateTaskData> {
  isCompleted?: boolean;
}

/**
 * Login credentials.
 */
export interface LoginData {
  email: string;
  password: string;
}

/**
 * Signup data includes login credentials plus a name.
 */
export interface SignupData extends LoginData {
  name: string;
}

/**
 * Options to filter tasks.
 */
export interface FilterOptions {
  completed?: boolean;
  tag?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
}

/**
 * Represents an API error with optional field-specific messages.
 */
export interface ApiError {
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
