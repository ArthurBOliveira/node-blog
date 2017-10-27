const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');

let {mongoose} = require('./server/db/mongoose');

let app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/views');
const filePath = path.join(__dirname, '/files');

app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use(express.static(filePath));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(fileUpload());

require('./server/routes/routes.js')(app, filePath);

app.listen(port, () => {
    console.log('Server on Port: ' + port);
});