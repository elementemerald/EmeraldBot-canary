const config = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const YouTube = require("simple-youtube-api");
const {YouTubeAPIKey} = require("./credentials.json")
const ytdl = require("ytdl-core");
const utils = require("./global/utils")
const moment = require("moment-timezone");
bot.commands = new Discord.Collection();
bot.youtube = new YouTube(YouTubeAPIKey);
// queue
bot.queue = new Map();
// vote skip
bot.votes = new Map();

global.currentTeamMembers = [];
global.servers = {};

require("./global/functions")(bot, utils, ytdl, config)

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("Couldn't find commands.");
      return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`)
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
})

//const activities_list = ["test", "commands! | e!help", "2019 | e!help", "elementemerald.tk",]; // creates an arraylist containing phrases you want your bot to switch through.

//bot.on('ready', () => {
  //console.log(`${bot.user.username} is online!`)
  //setInterval(async () => {
      //const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
      //await bot.user.setActivity(activities_list[index], {url: "https://twitch.tv/#"}, {type: "STREAMING",}); // sets bot's activities to one of the phrases in the arraylist.
  //}, 10000); // Runs this every 10 seconds.
//});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  // let guild = bot.guilds.get("541103926985097216")
  // let channel = bot.channels.get("541103926985097219")
  // let embed = new Discord.RichEmbed()
  // .setAuthor("Bot updated")
  // .setDescription(`${bot.user.username} has updated`)
  // .setColor("#0000ff")
  // .setFooter(`ID-${bot.user.id} | Canary v1.0.1`)
  // .setTimestamp()

  // channel.send(embed)
  // let statuses = [`${bot.guilds.size} servers! | ebc.help`, 'bugs! | ebc.help'];
  // let status = statuses[Math.floor(Math.random()*statuses.length - 1) + 1];
  // setInterval(function(){
  //   bot.user.setActivity(status, {type: "WATCHING",})
  // }, 10000)

  // bot.user.setActivity("bugs! | ebc.help", {type: "WATCHING",});
  // bot.user.setStatus('online')

  //bot.user.setGame("on SourceCade!");
  //{url: "https://twitch.tv/#"}
    // setInterval(async ()=>{
    //     let textList = [`${bot.guilds.size} servers! | ebc.help`, "commands! | ebc.help", "js | ebc.help"]
    //     // let typeList = ["STREAMING", "WATCHING", "PLAYING"]
    //     var text = textList[Math.floor(Math.random() * textList.length)];
    //     // var types = typeList[Math.floor(Math.random() * typeList.length)];
    //     bot.user.setActivity(text, {url: "https://twitch.tv/elementemerald"}, {type: "STREAMING"})
    // }, 10000); // milliseconds
    bot.user.setActivity("version v1.1.0! | ebc.help", {url: "https://twitch.tv/elementemerald"}, {type: "STREAMING"});
});

bot.on("message", async message => {
  if(!message.content.startsWith(config.prefix))return;
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  // if(cmd === `${prefix}kick`){

  //   //!kick @daeshan askin for it

  //   let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  //   if(!kUser) return message.channel.send("Can't find user!");
  //   let kReason = args.join(" ").slice(22);
  //   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
  //   if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

  //   let kickEmbed = new Discord.RichEmbed()
  //   .setDescription("~Kick~")
  //   .setColor("#e56b00")
  //   .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
  //   .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
  //   .addField("Kicked In", message.channel)
  //   .addField("Tiime", message.createdAt)
  //   .addField("Reason", kReason);

  //   let kickChannel = message.guild.channels.find(`name`, "incidents");
  //   if(!kickChannel) return message.channel.send("Can't find incidents channel.");

  //   message.guild.member(kUser).kick(kReason);
  //   kickChannel.send(kickEmbed);

  //   return;
  // }

  // if(cmd === `${prefix}ban`){

  //   let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  //   if(!bUser) return message.channel.send("Can't find user!");
  //   let bReason = args.join(" ").slice(22);
  //   if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
  //   if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

  //   let banEmbed = new Discord.RichEmbed()
  //   .setDescription("~Ban~")
  //   .setColor("#bc0000")
  //   .addField("Banned User", `${bUser} with ID ${bUser.id}`)
  //   .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
  //   .addField("Banned In", message.channel)
  //   .addField("Time", message.createdAt)
  //   .addField("Reason", bReason);

  //   let incidentchannel = message.guild.channels.find(`name`, "incidents");
  //   if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

  //   message.guild.member(bUser).ban(bReason);
  //   incidentchannel.send(banEmbed);


  //   return;
  // }


  // if(cmd === `${prefix}report`){

  //   //!report @ned this is the reason

  //   let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  //   if(!rUser) return message.channel.send("Couldn't find user.");
  //   let rreason = args.join(" ").slice(22);

  //   let reportEmbed = new Discord.RichEmbed()
  //   .setDescription("Reports")
  //   .setColor("#15f153")
  //   .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  //   .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
  //   .addField("Channel", message.channel)
  //   .addField("Time", message.createdAt)
  //   .addField("Reason", rreason);

  //   let reportschannel = message.guild.channels.find(`name`, "reports");
  //   if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


  //   message.delete().catch(O_o=>{});
  //   reportschannel.send(reportEmbed);

  //   return;
  // }




  // if(cmd === `${prefix}serverinfo`){

  //   let sicon = message.guild.iconURL;
  //   let serverembed = new Discord.RichEmbed()
  //   .setDescription("Server Information")
  //   .setColor("#15f153")
  //   .setThumbnail(sicon)
  //   .addField("Server Name", message.guild.name)
  //   .addField("Created On", message.guild.createdAt)
  //   .addField("You Joined", message.member.joinedAt)
  //   .addField("Total Members", message.guild.memberCount);

  //   return message.channel.send(serverembed);
  // }



  // if(cmd === `${prefix}botinfo`){

  //   let bicon = bot.user.displayAvatarURL;
  //   let botembed = new Discord.RichEmbed()
  //   .setDescription("Bot Information")
  //   .setColor("#15f153")
  //   .setThumbnail(bicon)
  //   .addField("Bot Name", bot.user.username)
  //   .addField("Created On", bot.user.createdAt);

  //   return message.channel.send(botembed);
  // }

});

//bot.on("guildCreate", (message, guild) => {
  //let embed = new Discord.RichEmbed()
  //.setColor("#2c75ea")
  //.setDescription("Joined a new server: " + guild.name)
  //.setAuthor(bot.user.username, bot.user.displayAvatarURL)
  //.setFooter(`ID-${message.createdTimestamp}`)
  //.setTimestamp()
  
  //bot.channels.get("539625984652214286").send(embed)
//})

// bot.on('guildMemberAdd', (message) => {
//   let guild = bot.guilds.get('526889757486219314')
//   let channel = bot.channels.get('526889757486219317')
//   let member = message
//   let embed = new Discord.RichEmbed()

//   .setAuthor("Member has joined.")
//   .setDescription(`Welcome, ` + member.user)
//   .setColor("#00ff00")
//   .setFooter(`ID-${member.user.id} | ${guild.memberCount} members`)

//   channel.send(embed)
// })

bot.on('guildMemberAdd', (message) => {
  console.log(`${member.user.username} joined the server.`)
  var role = member.guild.roles.find("name", "Unassigned")
  member.addRole(role)
})

// bot.on('guildMemberRemove', (message) => {
//   let guild = bot.guilds.get('526889757486219314')
//   let channel = bot.channels.get('526889757486219317')
//   let member = message
//   let embed = new Discord.RichEmbed()

//   .setAuthor("Member has left.")
//   .setDescription(`Goodbye, ` + member.user)
//   .setColor("#ff0000")
//   .setFooter(`ID-${member.user.id} | ${guild.memberCount} members`)

//   channel.send(embed)
// })

//bot.on('messageUpdate', (oldMessage, newMessage) => {
    //let embed = new Discord.RichEmbed()

    //.setAuthor("Message updated.")
//})

// bot.on('messageDelete', (message) => {
//   // let guild = bot.guilds.get("288448406806986752")
//   let channel = bot.channels.get("541103926985097219")
//   let member = message
//   let embed = new Discord.RichEmbed()

//   .setTitle("Message deleted")
//   .addField("User: ", `${message.author}`)
//   .addField("Guild ID: ", `${message.guild.id}`)
//   .addField("Message: ", `${message.content}`)
//   .setColor("#ffae00")
//   .setFooter(`ID-${member.id} | Canary v1.1.0`)

//   channel.send(embed)
// })

// bot.on('messageUpdate', (oldMessage, newMessage, message) => {
//   let guild = bot.guilds.get("288448406806986752")
//   let channel = bot.channels.get("539625984652214286")
//   let member = message
//   let embed = new Discord.RichEmbed()

//   .setAuthor("Message updated")
//   .addField("Before", oldMessage, true)
//   .addField("After", newMessage, true)
//   .setColor("#0000ff")
//   .setFooter(`ID-${member.id} | Canary v1.0.1`)

//   channel.send(embed)
// })

bot.login(config.token);