const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    postcode: Number,
    create: Date

})

const setting = mongoose.model('setting', schema);

module.exports = setting;
