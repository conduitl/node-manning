const express = require('express');
const app = express();

const bodyParser = require('body-parser');

let articles = [{ title: 'Example'}];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/articles', (req, res, next) => {
    res.send(articles);
});

app.post('/articles', (req, res, next) => {
    let article = { title: req.body.title };
    articles.push(article);
    res.send(article);
});

app.get('/articles/:id', (req, res, next) => {
    let id = req.params.id;
    console.log('Fetching:', id);
    res.send(articles[id]);
});

app.delete('/articles/:id', (req, res, next) => {
    let id = req.params.id;
    console.log('Deleting:', id);
    delete articles[id];
    res.send({ message: 'Deleted'});
});

app.listen(process.env.PORT || 3000);

module.exports = app;