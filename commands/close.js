const {SlashCommandBuilder}=require('discord.js');
const db=require('../database/db');

module.exports={
 data:new SlashCommandBuilder()
 .setName('close')
 .setDescription('close ticket'),

 async execute(i){
 await db.delete(`ticket_${t.ticketId}`);
 await i.reply('Closing...');
 setTimeout(()=>i.channel.delete(),3000)
 }
}
