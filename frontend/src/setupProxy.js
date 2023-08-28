// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:3002/auth/login',
//       changeOrigin: true,
//     })
//   );
// };
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    'http://localhost:3002/auth/login', // Change this to match the API routes you're calling
    createProxyMiddleware({
      target: 'http://localhost:3002', // Change this to match your server's address
      changeOrigin: true,
    })
  );
};
