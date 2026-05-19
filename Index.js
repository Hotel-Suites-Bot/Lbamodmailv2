require('dotenv').config();
const {Client,GatewayIntentBits,Partials,Collection}=require('discord.js');

const fs=require('fs');

const client=new Client({
 intents:[
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.DirectMessages
 ],
 partials:[Partials.Channel]
});

client.commands=new Collection();

for(const file of fs.readdirSync('./commands')){
 const c=require(`./commands/${file}`);
 client.commands.set(c.data.name,c);
}

for(const file of fs.readdirSync('./events')){
 require(`./events/${file}`)(client);
}

console.log('Local database ready');

client.login(process.env.TOKEN);
