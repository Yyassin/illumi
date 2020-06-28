const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    try {
        app.use(
            '/api',
            createProxyMiddleware({
                target: 'http://illumi2.canadaeast.cloudapp.azure.com/',
                changeOrigin: true,
            })
        );
    } catch (error) {
        console.log("Connection could not be established to the backend server.")
    }
};