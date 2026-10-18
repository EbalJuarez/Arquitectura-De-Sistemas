import { randomUUID } from "node:crypto";
import cors from "cors";
import express from "express";
import {
  createTask,
  isTaskStatus,
  summarizeTasks,
  validateTaskTitle,
  type ApiResponse,
  type Task,
  type TaskSummary,
} from "@hw05/shared";

export function createApp(initialTasks: Task[] = []) {
  const tasks: Task[] = [...initialTasks];
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, data: { status: "up" } } satisfies ApiResponse<{ status: string }>);
  });

  app.get("/api/tasks", (_req, res) => {
    res.json({ ok: true, data: tasks } satisfies ApiResponse<Task[]>);
  });

  app.get("/api/tasks/summary", (_req, res) => {
    res.json({ ok: true, data: summarizeTasks(tasks) } satisfies ApiResponse<TaskSummary>);
  });

  app.post("/api/tasks", (req, res) => {
    const { title, status } = req.body ?? {};

    const validation = validateTaskTitle(title);
    if (!validation.valid) {
      res.status(400).json({ ok: false, error: validation.error } satisfies ApiResponse<never>);
      return;
    }
    if (status !== undefined && !isTaskStatus(status)) {
      res.status(400).json({ ok: false, error: "Estado inválido" } satisfies ApiResponse<never>);
      return;
    }

    const task = createTask({ title, status }, randomUUID());
    tasks.push(task);
    res.status(201).json({ ok: true, data: task } satisfies ApiResponse<Task>);
  });

  app.patch("/api/tasks/:id", (req, res) => {
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      res.status(404).json({ ok: false, error: "Tarea no encontrada" } satisfies ApiResponse<never>);
      return;
    }
    const { status } = req.body ?? {};
    if (!isTaskStatus(status)) {
      res.status(400).json({ ok: false, error: "Estado inválido" } satisfies ApiResponse<never>);
      return;
    }
    task.status = status;
    res.json({ ok: true, data: task } satisfies ApiResponse<Task>);
  });

  return app;
}
