const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://heroku_p30zj8s8:h0p6dsclf8k7gv92rcq45vd2i7@ds227865.mlab.com:27865/heroku_p30zj8s8');

module.exports = {mongoose};