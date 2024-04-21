import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";

installGlobals();

export default defineConfig({
  build: {
    lib: {
      entry: "./app/containers/index.npm.tsx",
      name: "index",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
    outDir: "dist",
  },
  plugins: [react(), tsconfigPaths()],
});
