import { defineConfig } from "vite";

export default defineConfig({
  css: {    
      postcss: {
        config: "./postcss.config.js",      
    },
  },
});
