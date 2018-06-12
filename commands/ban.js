const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("Couldn't find that person. sorry..");
  let bReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No.");
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("Ban")
  .setColor("#9b000f")
  .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
  .addField("Banned By", `${message.author} with ID: ${message.author.id}`)
  .addField("Banned In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", bReason)

  let reportchannel = message.guild.channels.find(`name`, "reports");
  if(!reportchannel) return message.channel.send("Couldn't find a reports channel...");

  message.guild.member(bUser).ban(bReason);
  reportchannel.send(banEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ban", "b"],
  permLevel: "Moderator"
};

exports.help = {
  name: "ban",
  category: "Moderation",
  description: "Bans a user and sends a report to the report channel",
  usage: "ban @user reason"
};
