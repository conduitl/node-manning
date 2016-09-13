const connect = require('connect');
const errorHandler = require('./error-handler')
connect()
    .use( (req, res) => {
        foo(); // prompts error because undefined
        res.setHeader('Content-Type', 'text/plain');
        res.end('hello world');
    })
    .use(errorHandler())
.listen(3000);