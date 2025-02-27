import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure it outputs to 'dist'
    emptyOutDir: true, // Clears old files before building
  },
  server: {
    port: 3000, // Ensure this is your dev server port
  },
});