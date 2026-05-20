const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',

    async execute(message) {

        const embed = new EmbedBuilder()
        .setTitle('Modmail Help Menu')
        .setColor(0x2B2D31)
        .addFields(

            {
                name: 'Ticket Commands',
                value:
`-reply <msg>
-close
-claim
-transfer <role>`
            },

            {
                name: 'Setup Commands',
                value:
`-newcategory <name> @role <categoryID>
-removecategory <name>
-categories`
            },

            {
                name: 'Moderation',
                value:
`-ticketban <user> <reason>
-ticketunban <user>`
            },

            {
                name: 'System',
                value:
`Dropdown DM system
Modal ticket reason input
Role-based access control
Ticket logging enabled`
            }

        );

        message.channel.send({ embeds: [embed] });

    }
};
