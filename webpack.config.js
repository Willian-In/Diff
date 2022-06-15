const path = require('path');

module.exports = {
  // 入口
  entry: './src/index.js',
  // 出口
  output: {
    // 虚拟打包路径，不会真正的生成，而是在8080端口虚拟生成
    publicPath: 'xuni', // 不会真正物理生成,没有生成在文件夹中,而是生成了虚拟的8080中
    // 打包出来的文件名
    filename: 'bundle.js'
  },
  devServer: {
    // 端口号
    port: 8080,
    // 静态资源文件
    contentBase: 'www'
  }
};