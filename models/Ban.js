const mongoose = require('mongoose');

module.exports = mongoose.model('Ban', new mongoose.Schema({
    userId: String,
    reason: String
}));
