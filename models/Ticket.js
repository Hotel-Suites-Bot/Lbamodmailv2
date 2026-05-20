const mongoose = require('mongoose');

module.exports = mongoose.model('Ticket', new mongoose.Schema({

    userId: String,
    channelId: String,
    category: String,

    supportRoleId: String,

    claimedBy: {
        type: String,
        default: null
    }

}));
