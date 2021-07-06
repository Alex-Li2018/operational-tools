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
