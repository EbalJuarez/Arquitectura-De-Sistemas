import { describe, expect, it } from "vitest";
import { createTask, isTaskStatus, summarizeTasks, validateTaskTitle } from "./utils.js";
import type { Task } from "./types.js";

describe("validateTaskTitle", () => {
  it("rechaza valores que no son texto", () => {
    expect(validateTaskTitle(undefined).valid).toBe(false);
  });

  it("rechaza títulos muy cortos", () => {
    expect(validateTaskTitle("  ab ").valid).toBe(false);
  });

  it("rechaza títulos muy largos", () => {
    expect(validateTaskTitle("a".repeat(81)).valid).toBe(false);
  });

  it("acepta títulos válidos", () => {
    expect(validateTaskTitle("Configurar Turborepo")).toEqual({ valid: true });
  });
});

describe("isTaskStatus", () => {
  it("reconoce estados válidos e inválidos", () => {
    expect(isTaskStatus("done")).toBe(true);
    expect(isTaskStatus("archived")).toBe(false);
  });
});

describe("createTask", () => {
  it("recorta el título y usa 'pending' por defecto", () => {
    const now = new Date("2026-01-01T00:00:00.000Z");
    expect(createTask({ title: "  Hola mundo " }, "1", now)).toEqual({
      id: "1",
      title: "Hola mundo",
      status: "pending",
      createdAt: "2026-01-01T00:00:00.000Z",
    });
  });
});

describe("summarizeTasks", () => {
  it("devuelve ceros con una lista vacía", () => {
    expect(summarizeTasks([])).toEqual({
      total: 0,
      pending: 0,
      inProgress: 0,
      done: 0,
      completionRate: 0,
    });
  });

  it("cuenta por estado y calcula el porcentaje completado", () => {
    const base = { title: "x", createdAt: "" };
    const tasks: Task[] = [
      { ...base, id: "1", status: "pending" },
      { ...base, id: "2", status: "in_progress" },
      { ...base, id: "3", status: "done" },
      { ...base, id: "4", status: "done" },
    ];
    expect(summarizeTasks(tasks)).toEqual({
      total: 4,
      pending: 1,
      inProgress: 1,
      done: 2,
      completionRate: 50,
    });
  });
});
