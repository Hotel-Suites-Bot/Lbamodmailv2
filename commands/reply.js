const {SlashCommandBuilder}=require('discord.js');
const db=require('../database/db');

module.exports={
 data:new SlashCommandBuilder()
 .setName('reply')
 .setDescription('reply')
 .addStringOption(o=>o.setName('message').setRequired(true)),

 async execute(i){
 const all=await db.all();
const t=all.find(x=>x.id?.startsWith('ticket_')&&x.value.channelId===i.channel.id)?.value;
 if(!t)return i.reply({content:'Not ticket',ephemeral:true});

 const user=await i.client.users.fetch(t.userId);
 await user.send(i.options.getString('message'));

 i.reply('Sent');
 }
}
