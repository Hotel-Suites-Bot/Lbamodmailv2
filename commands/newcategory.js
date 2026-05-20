const Category = require('../models/Category');

module.exports = {
    name: 'newcategory',

    async execute(message, args) {

        if (!message.member.permissions.has('Administrator'))
            return;

        const name = args[0];
        const role = message.mentions.roles.first();
        const categoryId = args[2];

        if (!name || !role || !categoryId)
            return message.reply('Usage: -newcategory <name> @role <categoryID>');

        await Category.create({
            guildId: message.guild.id,
            name,
            roleId: role.id,
            categoryId
        });

        message.reply(`Category ${name} created`);
    }
};
