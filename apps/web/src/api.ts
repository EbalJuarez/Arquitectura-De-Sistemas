import type { ApiResponse, Task, TaskStatus } from "@hw05/shared";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  const body = (await res.json()) as ApiResponse<T>;
  if (!body.ok || body.data === undefined) {
    throw new Error(body.error ?? "Error inesperado");
  }
  return body.data;
}

export const api = {
  listTasks: () => request<Task[]>("/api/tasks"),
  createTask: (title: string) =>
    request<Task>("/api/tasks", { method: "POST", body: JSON.stringify({ title }) }),
  updateStatus: (id: string, status: TaskStatus) =>
    request<Task>(`/api/tasks/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),
};
