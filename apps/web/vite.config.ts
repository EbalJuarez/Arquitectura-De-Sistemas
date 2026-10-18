import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const API_URL = process.env.API_URL ?? "http://localhost:3001";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { "/api": API_URL },
  },
  preview: {
    port: 4173,
    proxy: { "/api": API_URL },
  },
  test: {
    environment: "jsdom",
  },
});
