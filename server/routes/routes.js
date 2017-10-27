const _ = require('lodash');

let {
    Post
} = require('./../models/post');

module.exports = (app, filePath, cloudinary) => {
    app.get('/', (req, res) => {
        Post.find().sort({
            date: -1
        }).then((posts) => {
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

    app.post('/post', (req, res) => {
        let body = _.pick(req.body, ['title', 'subTitle', 'text']);
        let file = req.files.file;
        let post = new Post(body);

        let localPath = filePath + '/' + file.name;

        file.mv(filePath + '/' + file.name, (err) => {
            if (err) return res.status(500).send(err);
        });

        cloudinary.uploader.upload(localPath, (result) => {
            console.log(result.secure_url);

            post.img = result.secure_url;

            post.save().then((post) => {
                res.render('admin.ejs', {
                    posts
                });
            }).catch((e) => {
                res.status(400).send(e);
            });
        });
    });
};