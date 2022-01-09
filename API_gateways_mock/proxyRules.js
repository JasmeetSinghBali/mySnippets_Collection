const { createProxyMiddleware } = require("http-proxy-middleware");

const setupProxies = (app,routes)=>{
    routes.forEach(element => {
        app.use(element.url,createProxyMiddleware(element.proxy))
    });
}

exports.setupProxies = setupProxies