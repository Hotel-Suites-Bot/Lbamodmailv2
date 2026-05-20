const Category = require('../models/Category');

module.exports = {
    name: 'categories',

    async execute(message) {

        const cats = await Category.find({ guildId: message.guild.id });

        if (!cats.length)
            return message.reply('No categories set.');

        message.reply(
            cats.map(c => `• ${c.name}`).join('\n')
        );
    }
};
