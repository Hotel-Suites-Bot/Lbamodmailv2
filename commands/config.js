const {
SlashCommandBuilder
} = require("discord.js");

module.exports={

data:new SlashCommandBuilder()

.setName("config")
.setDescription(
"Bot configuration"
),

async execute(interaction){

await interaction.reply({

content:
"Config system coming next",

ephemeral:true

});

}

};
