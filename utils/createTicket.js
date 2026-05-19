const db=require('../database/db');

module.exports=async(guild,user,category)=>{
 let count=await db.get(`counter_${guild.id}`)||0;
count++;
await db.set(`counter_${guild.id}`,count);

 const id=`ticket-${String(count).padStart(4,'0')}`;

 const roles=await db.get(`roles_${guild.id}_${category}`)||[];

 const ch=await guild.channels.create({
   name:id
 });

 await ch.send({
 content:roles.map(x=>`<@&${x}>`).join(' '),
 embeds:[{
 title:'New Ticket',
 description:`User: <@${user.id}>\nCategory:${category}\nID:${id}`
 }]
 });

 await db.set(`ticket_${id}`,{
 ticketId:id,
 userId:user.id,
 channelId:ch.id,
 category
});

 return ch;
}
