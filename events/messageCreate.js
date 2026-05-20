const {
    EmbedBuilder
} = require('discord.js');

const Ticket = require('../models/Ticket');
const Ban = require('../models/Ban');
const Category = require('../models/Category');

module.exports = (client) => {

client.on('messageCreate', async (message) => {

if (message.author.bot) return;

// ================= COMMANDS =================

if (message.guild && message.content.startsWith('-')) {

const args = message.content.slice(1).split(/ +/);
const cmd = args.shift().toLowerCase();

const ticket = await Ticket.findOne({ channelId: message.channel.id });

// CLAIM
if (cmd === 'claim') {

if (!ticket) return;

if (!message.member.roles.cache.has(ticket.supportRoleId) &&
!message.member.permissions.has('Administrator'))
return message.reply('No permission');

if (ticket.claimedBy)
return message.reply('Already claimed');

ticket.claimedBy = message.author.id;
await ticket.save();

return message.channel.send({
embeds: [new EmbedBuilder()
.setTitle('Claimed')
.setDescription(`${message.author} claimed this ticket`)]
});
}

// CLOSE
if (cmd === 'close') {

if (!ticket) return;

const user = await client.users.fetch(ticket.userId).catch(()=>null);

if (user) user.send('Ticket closed').catch(()=>{});

await Ticket.deleteOne({ channelId: message.channel.id });

return message.channel.delete();
}

// REPLY
if (cmd === 'reply') {

if (!ticket) return;

const msg = args.join(' ');
const user = await client.users.fetch(ticket.userId);

user.send({
embeds: [new EmbedBuilder()
.setTitle('Support Reply')
.setDescription(msg)]
});

return message.channel.send('Sent');
}

// TRANSFER
if (cmd === 'transfer') {

if (!ticket) return;

const role = message.mentions.roles.first() ||
message.guild.roles.cache.get(args[0]);

ticket.supportRoleId = role.id;
await ticket.save();

return message.channel.send(`Transferred to ${role}`);
}

// BAN
if (cmd === 'ticketban') {

const user = message.mentions.users.first() ||
await client.users.fetch(args[0]);

const reason = args.slice(1).join(' ') || 'No reason';

await Ban.create({ userId: user.id, reason });

return message.channel.send('Banned');
}

// UNBAN
if (cmd === 'ticketunban') {

const user = message.mentions.users.first() ||
await client.users.fetch(args[0]);

await Ban.deleteOne({ userId: user.id });

return message.channel.send('Unbanned');
}

const command = client.commands.get(cmd);
if (command) command.execute(message,args);

return;
}

// ================= DM =================

if (!message.guild) {

const banned = await Ban.findOne({ userId: message.author.id });
if (banned) return;

const ticket = await Ticket.findOne({ userId: message.author.id });

if (ticket) {

const channel = client.channels.cache.get(ticket.channelId);

return channel.send({
embeds: [new EmbedBuilder()
.setAuthor({ name: message.author.tag })
.setDescription(message.content)]
});
}

const categories = await Category.find();

const menu = {
type: 1,
components: []
};

const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

const select = new StringSelectMenuBuilder()
.setCustomId('ticket_select')
.setPlaceholder('Select category');

categories.forEach(c => select.addOptions({ label: c.name, value: c.name }));

const row = new ActionRowBuilder().addComponents(select);

return message.author.send({
content: 'Select category',
components: [row]
});

}

});

};
