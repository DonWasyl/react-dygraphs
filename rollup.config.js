import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    external: ['react', 'prop-types', 'dygraphs'],
    output: {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
    },
    plugins: [
      resolve({
        jsnext: true,
        main: true,
      }),
      babel({
        exclude: 'node_modules/**',
      }),
      filesize(),
    ],
  },
]
