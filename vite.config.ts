import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          ui: [
            "@chakra-ui/react",
            "@emotion/react",
            "react-icons",
            "next-themes",
          ],
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
