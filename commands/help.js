const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let helpembed = new Discord.RichEmbed()
    .setDescription("Canary Help Menu")
    .setColor("#4cea41")
    .addField("Member Commands", "help, serverinfo, report, ping")
    .addField("Mod Commands", "kick, warn, ban, mute, unmute")
    .addField("Fun Commands", "8ball")
    .addField("Voice Channel Commands", "play (WIP), disconnect")

    message.channel.send(helpembed);
}

module.exports.help = {
    name: "help"
}
