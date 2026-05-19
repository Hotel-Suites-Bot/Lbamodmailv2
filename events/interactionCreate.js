module.exports = (client) => {

client.on("interactionCreate", async interaction => {

if (!interaction.isChatInputCommand()) return;

const command =
client.commands.get(
interaction.commandName
);

if (!command) return;

try{

await command.execute(interaction);

}catch(err){

console.log(err);

if(interaction.replied){

interaction.followUp({
content:"Command error",
ephemeral:true
});

}else{

interaction.reply({
content:"Command error",
ephemeral:true
});

}

}

});

};
