const db=require('../database/db');
const createTicket=require('../utils/createTicket');

module.exports=(client)=>{
client.on('messageCreate',async msg=>{
 if(msg.author.bot)return;

 if(msg.channel.isDMBased()){
   const guild=client.guilds.cache.first();

   const keys=await db.all();
let t=keys.find(x=>x.id?.startsWith('ticket_')&&x.value.userId===msg.author.id)?.value;

   if(!t){
      await createTicket(guild,msg.author,'General');
      t=keys.find(x=>x.id?.startsWith('ticket_')&&x.value.userId===msg.author.id)?.value;
   }

   const channel=guild.channels.cache.get(t.channelId);
   if(channel) channel.send(`**${msg.author.tag}:** ${msg.content}`)
 }
});
}
