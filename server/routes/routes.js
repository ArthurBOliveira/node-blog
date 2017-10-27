const _ = require('lodash');

let {
    Post
} = require('./../models/post');

module.exports = (app, filePath) => {
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

        file.mv(filePath + '/' + file.name, (err) => {
            if (err) return res.status(500).send(err);
        });        

        post.img = '/files/' + file.name;

        post.save().then((post) => {
            res.render('admin.ejs', {
                posts
            });
        }).catch((e) => {
            res.status(400).send(e);
        });
    });

    app.post('/upload', (req, res) => {
        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.sampleFile;

        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(filePath + '/' + sampleFile.name, (err) => {
            if (err) return res.status(500).send(err);

            res.send('File uploaded!');
        });
    });
};