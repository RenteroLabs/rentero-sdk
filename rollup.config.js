import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.ts', // 入口文件
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: false,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: false,
    },
    {
      file: 'dist/rentero.min.js',
      format: 'umd',
      name: 'rentero',
      sourcemap: false,
      plugins: [terser()],
    },
  ],
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'ESNext',
        },
      },
      useTsconfigDeclarationDir: true,
    }),
  ],
}
