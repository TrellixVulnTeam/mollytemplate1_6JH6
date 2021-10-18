const Command = require("../../Build/Command");
const Discord = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "avatar",
      aliases: ["avatar"],
      description: "Display a member's avatar in an embedded message",
      usage: "[@user]",
      category: "Community",
      examples: ["!avatar", "!avatar @Molly"],
      cooldown: 10,
    });
  }

  async run(message, args) {
    if (message.author.bot) return;
    let dsMember = message.mentions.users.first();
    if (!dsMember) {
      const embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.tag}'s Avatar`)
        .setImage(
          `${message.author.displayAvatarURL({ dynamic: true, size: 1024 })}`
        )
        .setColor(message.guild.me.displayHexColor)
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        );

      message.channel.send(embed);
    } else {
      const embed = new Discord.MessageEmbed()
        .setTitle(`${dsMember.tag}'s Avatar`)
        .setImage(`${dsMember.displayAvatarURL({ dynamic: true, size: 1024 })}`)
        .setColor(message.guild.me.displayHexColor)
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        );

      message.channel.send(embed);
    }
  }
};
