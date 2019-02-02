const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(message.guild.voiceConnection)
    {
        message.guild.voiceConnection.disconnect();
    }
    else
    {
        message.reply(":no_entry_sign: **I am not in a voice channel!**")
    }
}

module.exports.help = {
    name: "leave"
}