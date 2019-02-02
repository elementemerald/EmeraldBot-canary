const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()

    .setAuthor("Listing members")
    .setDescription(`This server currently has ${message.guild.memberCount} members!`)
    .setColor("#faff00")
    .setFooter(`ID-${message.author.id} | Canary v1.1.0`)
    
    message.channel.send(embed)
}

module.exports.help = {
    name: "getmembers"
}