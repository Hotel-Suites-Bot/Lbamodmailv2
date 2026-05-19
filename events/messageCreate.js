const config=
require("../config");

const createTicket=
require("../utils/createTicket");

module.exports=
(client)=>{

client.on(
"messageCreate",
async message=>{

if(
message.author.bot
)return;


if(
message.channel.isDMBased()
){

const guild=
client.guilds.cache.first();

await createTicket(
guild,
message.author,
"General"
);

return;

}


if(
!message.content.startsWith(
config.prefix
)
)return;


const args=
message.content
.slice(
config.prefix.length
)
.trim()
.split(/ +/);

const cmdName=
args.shift()
.toLowerCase();

const cmd=
client.commands.get(
cmdName
);

if(!cmd)return;

try{

await cmd.execute(
message,
args
);

}catch(err){

console.log(err);

message.reply(
"Command failed"
);

}

});

};
