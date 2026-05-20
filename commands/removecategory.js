const Category = require('../models/Category');

module.exports = {
    name: 'removecategory',

    async execute(message, args) {

        if (!message.member.permissions.has('Administrator'))
            return;

        await Category.deleteOne({
            guildId: message.guild.id,
            name: args[0]
        });

        message.reply('Category removed');
    }
};
