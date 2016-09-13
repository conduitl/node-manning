const app = require('connect')();
app.use((req, res, next) => {
    res.end('Hello world! (from Connect)');
});
app.listen(3000);