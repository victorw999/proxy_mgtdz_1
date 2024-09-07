import { defineConfig } from 'vite';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default defineConfig({
  plugins: [
    commonjs(),
    resolve(),
  ],
  build: {
    // Optional: If you need to target older browsers, you can set the target
    target: 'es5',
  },
});