import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("API de tareas", () => {
  it("GET /api/health responde ok", async () => {
    const res = await request(createApp()).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it("POST /api/tasks crea una tarea válida", async () => {
    const app = createApp();
    const res = await request(app).post("/api/tasks").send({ title: "  Nueva tarea " });
    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe("Nueva tarea");
    expect(res.body.data.status).toBe("pending");

    const list = await request(app).get("/api/tasks");
    expect(list.body.data).toHaveLength(1);
  });

  it("POST /api/tasks rechaza títulos inválidos usando la validación compartida", async () => {
    const res = await request(createApp()).post("/api/tasks").send({ title: "ab" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/al menos 3/);
  });

  it("PATCH /api/tasks/:id actualiza el estado y el resumen lo refleja", async () => {
    const app = createApp();
    const created = await request(app).post("/api/tasks").send({ title: "Terminar tarea" });
    await request(app).patch(`/api/tasks/${created.body.data.id}`).send({ status: "done" });

    const summary = await request(app).get("/api/tasks/summary");
    expect(summary.body.data).toMatchObject({ total: 1, done: 1, completionRate: 100 });
  });

  it("PATCH /api/tasks/:id devuelve 404 si no existe", async () => {
    const res = await request(createApp()).patch("/api/tasks/nope").send({ status: "done" });
    expect(res.status).toBe(404);
  });
});
