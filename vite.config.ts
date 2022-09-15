import { resolve } from "path";
import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  build: {
    outDir: "./dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        nested: resolve(__dirname, "src/nested/index.html"),
      },
    },
  },
  plugins: [basicSsl()],
  root: "src",
  server: {
    https: true,
  },
});
