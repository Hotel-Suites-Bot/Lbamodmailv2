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
!message.member.permissions.has(
"Administrator"
))
return;

const categories=
await db.get(
`categories_${message.guild.id}`
)||[];

const logs=
await db.get(
`logs_${message.guild.id}`
);

const transcripts=
await db.get(
`transcripts_${message.guild.id}`
);

const counter=
await db.get(
`counter_${message.guild.id}`
)||0;

const embed=
new EmbedBuilder()

.setTitle(
"Sgt. Alan Config Settings"
)

.setDescription(
`Ticket Counter: ${counter}

Categories: ${categories.length}

Logs:
${logs?"Configured":"Not Set"}

Transcripts:
${transcripts?"Configured":"Not Set"}`
);

const row=
new ActionRowBuilder()

.addComponents(

new ButtonBuilder()

.setCustomId(
"cfg_categories"
)

.setLabel(
"📁 Categories"
)

.setStyle(
ButtonStyle.Primary
),

new ButtonBuilder()

.setCustomId(
"cfg_roles"
)

.setLabel(
"👥 Support Roles"
)

.setStyle(
ButtonStyle.Success
),

new ButtonBuilder()

.setCustomId(
"cfg_channels"
)

.setLabel(
"📢 Channels"
)

.setStyle(
ButtonStyle.Secondary
),

new ButtonBuilder()

.setCustomId(
"cfg_settings"
)

.setLabel(
"⚙ Ticket Settings"
)

.setStyle(
ButtonStyle.Danger
)

);

message.channel.send({

embeds:[embed],

components:[row]

});

}

};
