const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("Couldn't find that person. sorry..");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No.");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No");

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("Kick")
  .setColor("#f47441")
  .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
  .addField("Kicked By", `${message.author} with ID: ${message.author.id}`)
  .addField("Kicked In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", kReason)

  let reportchannel = message.guild.channels.find(`name`, "reports");
  if(!reportchannel) return message.channel.send("Couldn't find a reports channel...");

  message.guild.member(kUser).kick(kReason);
  reportchannel.send(kickEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["k"],
  permLevel: "Moderator"
};

exports.help = {
  name: "kick",
  category: "Moderation",
  description: "Kicks a user and sends a report to the report channel",
  usage: "kick @user reason"
};
