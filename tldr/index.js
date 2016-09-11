const express = require('express');
const bodyParser = require('body-parser');
const read = require('node-readability');
const app = express();
const Article = require('./db').Article;

const url = 'http://www.manning.com/cantelon2/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/articles', (req, res, next) => {
    Article.all( (err, articles) => {
        if (err) return next(err);
        res.format({
            html: function(){
                res.render('articles.ejs', { articles : articles });
            },
            json: function() {
                res.send(articles);
            }
        });
    });
});

app.get('/articles/:id', (req, res, next) => {
    let id = req.params.id;
    Article.find(id, (err, article) => {
        if (err) return next(err);
        res.send(article);
    });
});

app.delete('/articles/:id', (req, res, next) => {
    let id = req.params.id;
    Article.delete(id, (err) => {
        if (err) return next(err);
        res.send({ message: 'Deleted' });
    });
});

app.post('/articles', (req, res, next) => {
    let url = req.body.url;
    
    read(url, (err, result) => {
        Article.create(
            { title: result.title, content: result.content },
            ( err, article ) => {
                if (err) return next(err);
                res.send('OK');
            }
        );
    });
});

app.listen(process.env.PORT || 3000);

module.exports = app;