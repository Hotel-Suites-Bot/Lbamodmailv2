require('dotenv').config();

const fs = require('fs');
const mongoose = require('mongoose');

const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Channel]
});

client.commands = new Collection();

// load commands
for (const file of fs.readdirSync('./commands').filter(f => f.endsWith('.js'))) {
    const cmd = require(`./commands/${file}`);
    client.commands.set(cmd.name, cmd);
}

// load events
for (const file of fs.readdirSync('./events').filter(f => f.endsWith('.js'))) {
    require(`./events/${file}`)(client);
}

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(console.error);

client.login(process.env.TOKEN);
