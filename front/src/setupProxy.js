const proxy = require('http-proxy-middleware');
module.exports = function(app){
    app.use(
        '/api',
        createProxyMiddleware({
          target: 'https://i9b306.q.ssafy.io:8443/',
          changeOrigin: true,
        })
      );app.use(
        '/api1',
        createProxyMiddleware({
          target: 'https://i9b306.q.ssafy.io:8080/',
          changeOrigin: true,
        })
      );
}