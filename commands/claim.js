const {SlashCommandBuilder}=require('discord.js');
const db=require('../database/db');

module.exports={
 data:new SlashCommandBuilder()
 .setName('claim')
 .setDescription('claim'),
 async execute(i){
 const all=await db.all();
const t=all.find(x=>x.id?.startsWith('ticket_')&&x.value.channelId===i.channel.id)?.value;
 t.claimedBy=i.user.id;
await db.set(`ticket_${t.ticketId}`,t);
 i.reply(`${i.user} claimed ticket`)
 }
}
