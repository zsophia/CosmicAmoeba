const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Couldn't find that person. sorry..");
  let reason = args.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Report")
  .setColor("#f4a742")
  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", reason);

  let reportchannel = message.guild.channels.find(`name`, "reports");
  if(!reportchannel) return message.channel.send("Couldn't find a reports channel...");
  message.delete().catch(O_o => {});
  reportchannel.send(reportEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rp", "rep"],
  permLevel: "User"
};

exports.help = {
  name: "report",
  category: "Moderation",
  description: "Sends a report to the moderation team. If you abuse this command you will lose bot priveleges.",
  usage: "report"
};
