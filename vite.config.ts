// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7070', // bu backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
