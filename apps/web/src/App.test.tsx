import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";

const tasks = [
  { id: "1", title: "Configurar Turborepo", status: "done", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "2", title: "Crear frontend", status: "pending", createdAt: "2026-01-01T00:00:00.000Z" },
];

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("App", () => {
  it("muestra las tareas y el resumen calculado con @hw05/shared", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ json: () => Promise.resolve({ ok: true, data: tasks }) }),
    );
    render(<App />);

    expect(await screen.findByText("Configurar Turborepo")).toBeTruthy();
    expect(screen.getByText("50%")).toBeTruthy();
  });

  it("valida el título en el cliente con la misma regla que el backend", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ json: () => Promise.resolve({ ok: true, data: [] }) });
    vi.stubGlobal("fetch", fetchMock);
    render(<App />);
    await screen.findByRole("list");

    fireEvent.change(screen.getByLabelText("Título de la tarea"), { target: { value: "ab" } });
    fireEvent.click(screen.getByText("Agregar"));

    expect((await screen.findByRole("alert")).textContent).toMatch(/al menos 3/);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
