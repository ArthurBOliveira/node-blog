const _ = require('lodash');

let {Post} = require('./../models/post');

module.exports = (app, passport) => {
    app.get('/', (req, res) => {
        Post.find().then((posts) => {
            res.render('index.ejs', {posts});
        }, (e) => {
            res.status(400).send(e);
        });        
    });

    //#region Posts
    app.post('/post', (req, res) => {
        let body = _.pick(req.body, ['title', 'text', 'img']);
        let post = new Post(body);

        post.save().then((post) => {
            res.send(post);
        }).catch((e) => {
            res.status(400).send(e);
        });
    });
    //#endregion
};