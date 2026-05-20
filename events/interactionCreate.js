const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    EmbedBuilder,
    PermissionsBitField
} = require('discord.js');

const Category = require('../models/Category');
const Ticket = require('../models/Ticket');

module.exports = (client) => {

client.on('interactionCreate', async (interaction) => {

    if (interaction.isStringSelectMenu()) {

        const category = interaction.values[0];

        const modal = new ModalBuilder()
        .setCustomId(`ticket_${category}`)
        .setTitle('Ticket Info');

        const input = new TextInputBuilder()
        .setCustomId('reason')
        .setLabel('Why are you opening this ticket?')
        .setStyle(TextInputStyle.Paragraph);

        modal.addComponents(
            new ActionRowBuilder().addComponents(input)
        );

        return interaction.showModal(modal);
    }

    if (interaction.isModalSubmit()) {

        const categoryName = interaction.customId.replace('ticket_', '');
        const reason = interaction.fields.getTextInputValue('reason');

        const cat = await Category.findOne({ name: categoryName });

        const guild = interaction.guild;

        const channel = await guild.channels.create({
            name: `ticket-${interaction.user.username}`,
            parent: cat.categoryId,
            permissionOverwrites: [
                {
                    id: guild.roles.everyone,
                    deny: [PermissionsBitField.Flags.ViewChannel]
                },
                {
                    id: cat.roleId,
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages
                    ]
                },
                {
                    id: process.env.OWNER_ID,
                    allow: [PermissionsBitField.Flags.ViewChannel]
                }
            ]
        });

        await Ticket.create({
            userId: interaction.user.id,
            channelId: channel.id,
            category: categoryName,
            supportRoleId: cat.roleId
        });

        const embed = new EmbedBuilder()
        .setTitle('Ticket Created')
        .setDescription(reason)
        .setThumbnail(interaction.user.displayAvatarURL());

        channel.send({
            content: `<@&${cat.roleId}>`,
            embeds: [embed]
        });

        interaction.reply({
            content: 'Ticket created',
            ephemeral: true
        });
    }

});

};
