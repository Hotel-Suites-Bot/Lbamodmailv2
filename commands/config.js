const {
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
}=require("discord.js");

const db=require("../database/db");

module.exports={

name:"config",

async execute(message){

if(
!message.member.permissions.has("Administrator")
) return;

const categories=
await db.get(
`categories_${message.guild.id}`
)||[];

const logs=
await db.get(
`logs_${message.guild.id}`
)||"Not Set";

const transcripts=
await db.get(
`transcripts_${message.guild.id}`
)||"Not Set";

const embed=
new EmbedBuilder()
.setTitle(
"British Army Modmail Config"
)
.setDescription(
`Categories: ${categories.length}

Logs: ${logs}

Transcripts: ${transcripts}`
);

const row=
new ActionRowBuilder()
.addComponents(

new ButtonBuilder()
.setCustomId("cfg_addcat")
.setLabel("Add Category")
.setStyle(ButtonStyle.Success),

new ButtonBuilder()
.setCustomId("cfg_removecat")
.setLabel("Remove Category")
.setStyle(ButtonStyle.Danger),

new ButtonBuilder()
.setCustomId("cfg_setlogs")
.setLabel("Set Logs")
.setStyle(ButtonStyle.Primary),

new ButtonBuilder()
.setCustomId("cfg_settranscripts")
.setLabel("Set Transcripts")
.setStyle(ButtonStyle.Secondary)

);

await message.channel.send({
embeds:[embed],
components:[row]
});

}

};
