/*
 * @Author: Whzcorcd
 * @Date: 2020-08-25 11:06:43
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-01 17:35:56
 * @Description: file content
 */
// rollup.config.js
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

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
      include: 'node_modules/**',
    }),
    typescript({
      tsconfig: 'tsconfig.json',
    }),
  ],
}
