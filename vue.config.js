module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  // 修改或新增html-webpack-plugin的值，在index.html里面能读取htmlWebpackPlugin.options.title
  chainWebpack: config =>{
    config.plugin('html').tap(args => {
      args[0].title = '文章运营工具';
      return args;
    })
  },
  devServer: {
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000/v1',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
            ['^/api']: ''
        }
      }
    }
  },
};
