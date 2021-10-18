const Command = require("../../Build/Command");
const Discord = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "pp",
      aliases: ["pp"],
      description: "Shows you your PP size",
      usage: "[@user]",
      category: "Fun",
      examples: ["!pp", "!pp @Molly"],
      cooldown: 10,
    });
  }

  async run(message, args) {
    let userTagged =
      message.mentions.members.first() ||
      message.guild.members.cache.find((member) => member.user.tag == args[0]);
    if (userTagged) {
      var sizes = [
        "BD",
        "B=D",
        "B==D",
        "B===D",
        "B====D",
        "B=====D",
        "B======D",
        "B=======D",
        "B========D",
        "B=========D",
        "B==========D",
        "B===========D",
      ];
      var peepee = Math.floor(Math.random() * sizes.length);
      const embed = new Discord.MessageEmbed()
        .setTitle("peepee size machine")
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${userTagged.username}'s penis\n${sizes[peepee]}`);
      message.channel.send(embed);
    } else {
      var sizes = [
        "BD",
        "B=D",
        "B==D",
        "B===D",
        "B====D",
        "B=====D",
        "B======D",
        "B=======D",
        "B========D",
        "B=========D",
        "B==========D",
        "B===========D",
      ];
      var peepee = Math.floor(Math.random() * sizes.length);
      const embed = new Discord.MessageEmbed()
        .setTitle("peepee size machine")
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${message.author.username}'s penis\n${sizes[peepee]}`);
      message.channel.send(embed);
    }
  }
};
