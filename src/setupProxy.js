const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/api/v1', {
    target: 'https://c.y.qq.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api/v1': ''
    }
  }))
  app.use(proxy('/api/v2', {
    target: 'https://u.y.qq.com/',
    changeOrigin: true,
    pathRewrite: {
      '^/api/v2': ''
    }
  }))
}