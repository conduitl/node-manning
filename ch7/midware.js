const connect = require('connect');
const custom_logger = require('./config-ware')
function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}
function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}
connect()
    .use(custom_logger(':method :url'))
    .use(hello)
    .listen(3000);