const Discord = require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (bot, message, args) => {
    const { body } = await snekfetch
            .get('https://www.reddit.com/r/cursedimages.json?sort=top&t=week')
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send(':no_entry_sign: Error fetching subreddit');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        const embed = new Discord.RichEmbed()
        // .setColor(0x00A2E8)
        .setColor("#0000ff")
        // .setTitle(allowed[randomnumber].data.title)
        .setTitle("r/cursedimages")
        // .setDescription("Posted by: " + allowed[randomnumber].data.author)
        .setImage(allowed[randomnumber].data.url)
        // .addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
        .setFooter("Curseness provided by r/cursedimages")
        message.channel.send(embed)
}

module.exports.help = {
    name: "cursedimage"
}