const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

let {mongoose} = require('./server/db/mongoose');

let app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/views');

app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

require('./server/routes/routes.js')(app);

app.listen(port, () => {
    console.log('Server on Port: ' + port);
});