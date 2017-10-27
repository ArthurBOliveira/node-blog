const _ = require('lodash');

let {
    Post
} = require('./../models/post');

module.exports = (app, passport) => {
    app.get('/', (req, res) => {
        Post.find().sort({date: -1}).then((posts) => {
            res.render('index.ejs', {
                posts
            });
        }, (e) => {
            res.status(400).send(e);
        });
    });

    app.get('/admin', (req, res) => {
        Post.find().then((posts) => {
            res.render('admin.ejs', {
                posts
            });
        }, (e) => {
            res.status(400).send(e);
        });
    });

    //#region Posts
    app.post('/post', (req, res) => {
        let body = _.pick(req.body, ['title', 'subTitle', 'text', 'img']);
        let post = new Post(body);

        post.save().then((post) => {
            res.render('admin.ejs', {
                posts
            });
        }).catch((e) => {
            res.status(400).send(e);
        });
    });
    //#endregion
};