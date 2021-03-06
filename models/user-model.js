const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    googleID: String
})

module.exports = mongoose.model('user', userSchema);
