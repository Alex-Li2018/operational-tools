module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'https://mp.weixin.qq.com',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
            ['^/api']: ''
        }
      }
    }
  },
};
