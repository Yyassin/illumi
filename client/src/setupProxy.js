const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    try {
        app.use(
            '/api',
            createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true,
            })
        );
    } catch (error) {
        console.log("Connection could not be established to the backend server.")
    }
};