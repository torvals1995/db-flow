export default {
  input: 'src/cli.js',
  output: {
    file: 'dist/cli.js', // rollup支持的多种输出格式(有amd,cjs, es, iife 和 umd)
    format: 'cjs',
  },
}
