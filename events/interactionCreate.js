module.exports=(client)=>{

client.on(
"interactionCreate",
async interaction=>{

if(
!interaction.isButton()
)return;


if(
interaction.customId
==="cfg_categories"
){

return interaction.reply({

content:
"Category system next",

ephemeral:true

});

}


if(
interaction.customId
==="cfg_roles"
){

return interaction.reply({

content:
"Support role system next",

ephemeral:true

});

}


if(
interaction.customId
==="cfg_channels"
){

return interaction.reply({

content:
"Channel config next",

ephemeral:true

});

}


if(
interaction.customId
==="cfg_settings"
){

return interaction.reply({

content:
"Ticket settings next",

ephemeral:true

});

}

});

};
