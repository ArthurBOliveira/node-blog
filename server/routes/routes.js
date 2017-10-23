let {Post} = require('./../models/post');

module.exports = (app, passport) => {
    app.get('/', (req, res) => {
        Post.find().then((posts) => {
            res.render('index.ejs', {posts});
        }, (e) => {
            res.status(400).send(e);
        });        
    });
};