import { createTask } from "@hw05/shared";
import { createApp } from "./app.js";

const PORT = Number(process.env.PORT ?? 3001);

const seed = [
  createTask({ title: "Configurar Turborepo", status: "done" }, "seed-1"),
  createTask({ title: "Crear librería compartida", status: "in_progress" }, "seed-2"),
  createTask({ title: "Documentar el monorepo" }, "seed-3"),
];

createApp(seed).listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
