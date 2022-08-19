/*
 * @Author: wangxian
 * @Date: 2022-08-19 16:08:41
 * @LastEditTime: 2022-08-19 16:40:56
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      logLevel: 'error',
      target: 'http://127.0.0.1:8088/',
      changeOrigin: true,

      pathRewrite: {
        '^/api': '/api',
      },
    })
  );
};

// https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually
// https://github.com/chimurai/http-proxy-middleware
