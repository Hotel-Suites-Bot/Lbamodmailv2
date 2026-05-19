require("dotenv").config();

const {
Client,
GatewayIntentBits,
Partials,
Collection
}=require("discord.js");

const fs=require("fs");

const client=new Client({

intents:[
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent,
GatewayIntentBits.DirectMessages
],

partials:[
Partials.Channel
]

});

client.commands=new Collection();

for(const file of fs.readdirSync("./commands")){

if(!file.endsWith(".js"))
continue;

const cmd=require(`./commands/${file}`);

if(
!cmd.name ||
!cmd.execute
){

console.log(
`[SKIPPED] ${file}`
);

continue;

}

client.commands.set(
cmd.name,
cmd
);

console.log(
`[LOADED] ${cmd.name}`
);

}

for(const file of fs.readdirSync("./events")){

if(!file.endsWith(".js"))
continue;

require(
`./events/${file}`
)(client);

}

client.login(
process.env.TOKEN
);
