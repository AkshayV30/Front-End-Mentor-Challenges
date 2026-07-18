import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Automatically include your abstracts/base/etc in every SCSS file
        additionalData: `
          @use "@/styles/abstracts" as *;
          @use "@/styles/base" as *;
          @use "@/styles/composition" as *;
          @use "@/styles/utilities" as *;
          @use "@/styles/blocks" as *;
          @use "@/styles/pages" as *;
          @use "@/styles/exceptions" as *;
        `,
      },
    },
  },
  root: path.resolve(__dirname), // current challenge folder
  base: "./", // relative paths in build
  build: {
    outDir: "dist", // output folder
    assetsDir: "assets", // folder for images, css, js
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"), // make sure entry html is correct
    },
  },
  server: {
    open: true, // open browser on dev
  },
});
