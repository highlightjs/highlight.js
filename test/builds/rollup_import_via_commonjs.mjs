// rollup.config.js
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'test/builds/package.js',
  output: {
    file: 'build/bundle.js',
    format: 'iife'
  },
  plugins: [
    commonjs({
      include: 'build/**',  // Default: undefined
      exclude: [ 'node_modules/**' ],  // Default: undefined
    })
  ]
};
