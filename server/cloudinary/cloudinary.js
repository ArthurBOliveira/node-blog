let cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || 'hfandkxtn',
    api_key: process.env.API_KEY || '121994767649174',
    api_secret: process.env.API_SECRET || 'Ll4Yxs8t9pvTJDllGtbkkzkzWtM'
});

module.exports = {
    cloudinary
};