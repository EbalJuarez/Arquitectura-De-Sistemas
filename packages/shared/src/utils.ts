import type {
  CreateTaskInput,
  Task,
  TaskStatus,
  TaskSummary,
  ValidationResult,
} from "./types.js";

export const TASK_TITLE_MIN_LENGTH = 3;
export const TASK_TITLE_MAX_LENGTH = 80;

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  pending: "Pendiente",
  in_progress: "En progreso",
  done: "Completada",
};

export function isTaskStatus(value: unknown): value is TaskStatus {
  return typeof value === "string" && value in TASK_STATUS_LABELS;
}

export function validateTaskTitle(title: unknown): ValidationResult {
  if (typeof title !== "string") {
    return { valid: false, error: "El título es obligatorio" };
  }
  const trimmed = title.trim();
  if (trimmed.length < TASK_TITLE_MIN_LENGTH) {
    return {
      valid: false,
      error: `El título debe tener al menos ${TASK_TITLE_MIN_LENGTH} caracteres`,
    };
  }
  if (trimmed.length > TASK_TITLE_MAX_LENGTH) {
    return {
      valid: false,
      error: `El título no puede superar ${TASK_TITLE_MAX_LENGTH} caracteres`,
    };
  }
  return { valid: true };
}

export function createTask(input: CreateTaskInput, id: string, now = new Date()): Task {
  return {
    id,
    title: input.title.trim(),
    status: input.status ?? "pending",
    createdAt: now.toISOString(),
  };
}

export function summarizeTasks(tasks: Task[]): TaskSummary {
  const pending = tasks.filter((t) => t.status === "pending").length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;
  const done = tasks.filter((t) => t.status === "done").length;
  const total = tasks.length;
  return {
    total,
    pending,
    inProgress,
    done,
    completionRate: total === 0 ? 0 : Math.round((done / total) * 100),
  };
}

export function formatDate(iso: string, locale = "es-GT"): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}
