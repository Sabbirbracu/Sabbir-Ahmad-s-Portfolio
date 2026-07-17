import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "https://sabbirs-portfolio-backend.onrender.com",
        changeOrigin: true,
      },
    },
  },
  build: {
    // Emit source maps so production JS can be mapped back to original source
    // (resolves Lighthouse "missing source maps" best-practices finding).
    sourcemap: true,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
