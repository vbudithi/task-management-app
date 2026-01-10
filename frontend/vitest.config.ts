import { defineConfig } from 'vitest/config';
import path from 'path';
import dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/integration/tasks-api.test.ts'],
    globals: true,
     alias: {
      "@": path.resolve(__dirname),
    },

  },
});
