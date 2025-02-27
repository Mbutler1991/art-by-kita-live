import { defineConfig } from 'vite';


export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://art-by-kita-81626722ece0.herokuapp.com", // Update to your Heroku backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});