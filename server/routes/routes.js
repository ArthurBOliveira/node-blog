const _ = require('lodash');

let moment = require('./../../views/js/moment');

let {
    Post
} = require('./../models/post');

module.exports = (app, filePath, cloudinary) => {
    app.get('/', (req, res) => {
        Post.find().limit(5).sort({
            date: -1
        }).then((posts) => {
            res.render('index.ejs', {
                posts, moment
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

    app.get('/posts/:page', (req, res) => {
        let page = parseInt(req.params.page);
        console.log(page);
        
        Post.find().limit(5).skip(page).sort({date: -1}).then((posts) => {
            console.log(posts);
            res.send({posts});
        }, (e) => {
            res.status(400).send(e);
        });
    });

    app.post('/post', (req, res) => {
        let body = _.pick(req.body, ['title', 'subTitle', 'text']);
        let file = req.files.img;
        let post = new Post(body);

        console.log(file);

        let localPath = filePath + '/' + file.name;

        file.mv(filePath + '/' + file.name, (err) => {
            if (err) return res.status(500).send(err);
        });

        cloudinary.uploader.upload(localPath, (result) => {
            console.log(result.secure_url);

            post.img = result.secure_url;
            console.log(post);

            post.save().then((post) => {
                res.send(post);
            }).catch((e) => {
                res.status(400).send(e);
            });
        });
    });
};