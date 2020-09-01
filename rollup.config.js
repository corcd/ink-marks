/*
 * @Author: Whzcorcd
 * @Date: 2020-08-25 11:06:43
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-08-28 09:03:09
 * @Description: file content
 */
// rollup.config.js
import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.ts',
  output: {
    name: 'Inkmarks',
    file: 'dist/index.js',
    format: 'umd',
    exports: 'auto',
  },
  plugins: [
    resolve(),
    commonjs({
      // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
      include: 'node_modules/**',
    }),
    typescript({
      tsconfig: 'tsconfig.json',
    }),
  ],
}
