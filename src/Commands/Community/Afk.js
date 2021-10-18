const Command = require("../../Build/Command");
const Discord = require("discord.js");
const afkSchema = require("../../Schema/afkSchema");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "afk",
      aliases: ["afk"],
      description:
        "Set an AFK message in case someone pings you.\nTo came back from AFK you need to send 3 messages.",
      usage: "<reason>",
      category: "Community",
      examples: ["!afk sleeping"],
      cooldown: 10,
    });
  }

  async run(message, args) {
    let reason = args.join(" ");
    if (!reason)
      return message.channel.send("You need to give a reason to go AFK!");
    let afkProfile = await afkSchema.findOne({ userID: message.author.id });
    if (!afkProfile) {
      afkProfile = await new afkSchema({
        userID: message.author.id,
        reason: reason,
      });
      await afkProfile.save();
      const embed = new Discord.MessageEmbed()
        .setTitle("Going away from keyboard")
        .setDescription(`You have been set to AFK\n**Reason:** ${reason}`)
        .setColor(message.guild.me.displayHexColor)
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        );
      message.channel.send(embed);
    } else return message.reply("You're AFK already!");
  }
};
