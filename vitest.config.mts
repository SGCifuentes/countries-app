import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    coverage: {
      reporter: ['text', 'html'],
      exclude: [
        'vitest.config.mts',
        'next.config.ts',
        'postcss.config.*',
        'tailwind.config.*',
        'node_modules/**',
        'src/**/__mocks__/**',
        '.next/**',
        'eslint.config.mjs',
        'next-env.d.ts'
      ],
      thresholds: {
        global: { lines: 80, functions: 80, branches: 70, statements: 80 }
      }
    }
  }
});
