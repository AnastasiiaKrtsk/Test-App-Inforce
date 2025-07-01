import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// 🔥 Replace `Test-App-Inforce` with your actual repo name
export default defineConfig({
  plugins: [react()],
  base: '/Test-App-Inforce/',
});
