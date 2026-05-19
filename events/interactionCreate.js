const {
ModalBuilder,
TextInputBuilder,
TextInputStyle,
ActionRowBuilder
}=require("discord.js");

const db=
require("../database/db");

module.exports=(client)=>{

client.on(
"interactionCreate",
async interaction=>{

if(
interaction.isButton()
){

if(
interaction.customId==="cfg_addcat"
){

const modal=
new ModalBuilder()

.setCustomId(
"addcat_modal"
)

.setTitle(
"Add Category"
);

const input=
new TextInputBuilder()

.setCustomId(
"name"
)

.setLabel(
"Category Name"
)

.setStyle(
TextInputStyle.Short
);

modal.addComponents(
new ActionRowBuilder()
.addComponents(input)
);

return interaction.showModal(
modal
);

}


if(
interaction.customId==="cfg_removecat"
){

const modal=
new ModalBuilder()

.setCustomId(
"removecat_modal"
)

.setTitle(
"Remove Category"
);

const input=
new TextInputBuilder()

.setCustomId(
"name"
)

.setLabel(
"Category Name"
)

.setStyle(
TextInputStyle.Short
);

modal.addComponents(
new ActionRowBuilder()
.addComponents(input)
);

return interaction.showModal(
modal
);

}

}


if(
interaction.isModalSubmit()
){

if(
interaction.customId==="addcat_modal"
){

const name=
interaction.fields.getTextInputValue(
"name"
);

let cats=
await db.get(
`categories_${interaction.guild.id}`
)||[];

cats.push(name);

await db.set(
`categories_${interaction.guild.id}`,
cats
);

return interaction.reply({

content:
`Added ${name}`,

ephemeral:true

});

}


if(
interaction.customId==="removecat_modal"
){

const name=
interaction.fields.getTextInputValue(
"name"
);

let cats=
await db.get(
`categories_${interaction.guild.id}`
)||[];

cats=
cats.filter(
x=>x!==name
);

await db.set(
`categories_${interaction.guild.id}`,
cats
);

return interaction.reply({

content:
`Removed ${name}`,

ephemeral:true

});

}

}

});
};
