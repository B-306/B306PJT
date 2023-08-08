const proxy = require('http-proxy-middleware');
module.exports = function(app){
    app.use(
        '/api',
        proxy({
            target: 'https://i9b306.q.ssafy.io:8443/',
            changeOrigin:true,
        })
    )
    app.use(
        '/api1',
        proxy({
            target: 'https://i9b306.q.ssafy.io:8080/',
            changeOrigin:true,
        })
    )
    
}