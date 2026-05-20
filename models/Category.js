const mongoose = require('mongoose');

module.exports = mongoose.model('Category', new mongoose.Schema({
    guildId: String,
    name: String,
    roleId: String,
    categoryId: String
}));
