import { useEffect, useState, type FormEvent } from "react";
import {
  TASK_STATUS_LABELS,
  formatDate,
  summarizeTasks,
  validateTaskTitle,
  type Task,
  type TaskStatus,
} from "@hw05/shared";
import { api } from "./api";

const STATUSES = Object.keys(TASK_STATUS_LABELS) as TaskStatus[];

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .listTasks()
      .then(setTasks)
      .catch(() => setError("No se pudo conectar con la API (¿está corriendo en el puerto 3001?)"))
      .finally(() => setLoading(false));
  }, []);

  const summary = summarizeTasks(tasks);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Misma validación que usa el backend, importada de @hw05/shared
    const validation = validateTaskTitle(title);
    if (!validation.valid) {
      setError(validation.error ?? "Título inválido");
      return;
    }
    try {
      const task = await api.createTask(title);
      setTasks((prev) => [...prev, task]);
      setTitle("");
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function handleStatusChange(id: string, status: TaskStatus) {
    try {
      const updated = await api.updateStatus(id, status);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <main className="container">
      <header>
        <h1>Gestor de tareas</h1>
        <p className="subtitle">
          HW-05 · Monorepo con Turborepo · tipos y validaciones desde <code>@hw05/shared</code>
        </p>
      </header>

      <section className="summary" aria-label="Resumen">
        <div><strong>{summary.total}</strong><span>Total</span></div>
        <div><strong>{summary.pending}</strong><span>{TASK_STATUS_LABELS.pending}</span></div>
        <div><strong>{summary.inProgress}</strong><span>{TASK_STATUS_LABELS.in_progress}</span></div>
        <div><strong>{summary.done}</strong><span>{TASK_STATUS_LABELS.done}</span></div>
        <div><strong>{summary.completionRate}%</strong><span>Avance</span></div>
      </section>

      <form onSubmit={handleSubmit} className="task-form">
        <input
          aria-label="Título de la tarea"
          placeholder="Nueva tarea…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
      {error && <p role="alert" className="error">{error}</p>}

      {loading ? (
        <p>Cargando…</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task task--${task.status}`}>
              <div>
                <span className="task-title">{task.title}</span>
                <time dateTime={task.createdAt}>{formatDate(task.createdAt)}</time>
              </div>
              <select
                aria-label={`Estado de ${task.title}`}
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value as TaskStatus)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{TASK_STATUS_LABELS[s]}</option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      )}

      <footer>Librería compartida: <code>@hw05/shared</code> · Backend: <code>@hw05/api</code></footer>
    </main>
  );
}
