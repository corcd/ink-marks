/*
 * @Author: Whzcorcd
 * @Date: 2020-08-25 11:06:43
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-09-03 10:24:28
 * @Description: file content
 */
// rollup.config.js
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default {
  onwarn(warning) {
    // 跳过某些警告
    if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return
    // 抛出异常
    if (warning.code === 'NON_EXISTENT_EXPORT') throw new Error(warning.message)
    // 控制台打印一切警告
    console.warn(warning.message)
  },
  input: 'src/index.ts',
  output: [
    {
      name: 'Inkmarks',
      file: 'dist/index.js',
      format: 'iife',
      exports: 'auto',
      globals: {
        crypto: 'crypto',
      },
    },
    {
      name: 'Inkmarks',
      file: 'dist/index.min.js',
      format: 'iife',
      exports: 'auto',
      globals: {
        crypto: 'crypto',
      },
      plugins: [
        terser({
          compress: {
            ecma: 2015,
            pure_getters: true,
          },
        }),
      ],
    },
    {
      name: 'Inkmarks',
      file: 'dist/index.esm.js',
      format: 'esm',
      exports: 'auto',
      globals: {
        crypto: 'crypto',
      },
    },
    {
      name: 'Inkmarks',
      file: 'dist/index.cjs.js',
      format: 'cjs',
      exports: 'auto',
      globals: {
        crypto: 'crypto',
      },
    },
  ],
  watch: {
    include: 'src/**',
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
