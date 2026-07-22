import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    tanstackStart({
      // Emit static HTML for every route so the site can be served by a
      // static host (GitHub Pages) with no Node server.
      prerender: { enabled: true },
    }),
    react(),
  ],
});
