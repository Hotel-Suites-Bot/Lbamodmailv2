require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection
} = require("discord.js");

const fs = require("fs");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ],
    partials: [
        Partials.Channel
    ]
});

client.commands = new Collection();

console.log("Loading commands...");

for (const file of fs.readdirSync("./commands")) {

    if (!file.endsWith(".js")) continue;

    const command = require(`./commands/${file}`);

    if (!command.data || !command.execute) {
        console.log(`[SKIPPED] ${file}`);
        continue;
    }

    client.commands.set(
        command.data.name,
        command
    );

    console.log(
        `[LOADED] ${command.data.name}`
    );
}

console.log("Loading events...");

for (const file of fs.readdirSync("./events")) {

    if (!file.endsWith(".js")) continue;

    require(`./events/${file}`)(client);

}

client.login(process.env.TOKEN);
