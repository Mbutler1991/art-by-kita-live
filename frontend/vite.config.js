export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://art-by-kita-backend.herokuapp.com", // Update to your Heroku backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});