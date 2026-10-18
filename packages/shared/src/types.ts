export type TaskStatus = "pending" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
}

export interface CreateTaskInput {
  title: string;
  status?: TaskStatus;
}

export interface TaskSummary {
  total: number;
  pending: number;
  inProgress: number;
  done: number;
  completionRate: number;
}

export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}
