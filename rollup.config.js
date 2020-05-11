// 支持es6语法
// webpack 只是支持es5语法
// rollup-plugin-babel rollup-plugin-serve
import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
  input: "./src/index.js", // 以哪个文件作为打包的入口
  output: {
    file: 'dist/umd/vue.js',  // 出口路径
    name: 'Vue', // 指定打包后全局变量的名称
    format: 'umd', // 统一模块规范
    sourcemap: true, // es6 -> es5  开启源码调试，可以找到源代码报错位置
  },
  plugins: [ // 使用的插件
    babel({
      exclude: 'node_modules/**', // 忽略文件
    }),
    process.env.ENV == 'development' ? serve({
      open: true,
      openPage: '/public/index.html', // 默认打开html的路径
      port: 3000,
      contentBase: '', // 当前文件夹路径
    }) : null
  ]
}