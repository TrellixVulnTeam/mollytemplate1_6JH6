const Command = require("../../Build/Command");
const Discord = require("discord.js");
const { parse } = require("twemoji-parser");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "jumbo",
      aliases: ["jumbo"],
      description: "increase the size of any emoji",
      category: "Community",
    });
  }
  async run(message, args) {
    // Variables
    const emoji = args[0];

    // Input
    if (!emoji) return message.channel.send("Error! No emoji provided!");

    // Executing
    let custom = Discord.Util.parseEmoji(emoji);

    const embed = new Discord.MessageEmbed()
      .setTitle(`Enlarged version of ${emoji}`)
      .setColor(message.guild.me.displayHexColor)
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    if (custom.id) {
      embed.setImage(
        `https://cdn.discordapp.com/emojis/${custom.id}.${
          custom.animated ? "gif" : "png"
        }`
      );
      return message.channel.send(embed);
    } else {
      let parsed = parse(emoji, { assetType: "png" });
      if (!parsed[0])
        return message.channel.send(
          "Error! Invalid Emoji Provided! Please provide an emoji to enlarge!"
        );

      embed.setImage(parsed[0].url);
      return message.channel.send(embed);
    }
  }
};
