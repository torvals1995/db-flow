import path from 'path'
export default {
  input: 'src/cli.js',
  output: {
    dir: path.resolve(__dirname, 'dist'),
    // file: 'dist/cli.js', // rollup支持的多种输出格式(有amd,cjs, es, iife 和 umd)
    exports: 'named',
    format: 'cjs',
    sourcemap: true
  },
}
