const Command = require("../../Build/Command.js");
const Discord = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["fish"],
      category: "Administration",
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    const embed1 = new Discord.MessageEmbed()
      .setTitle(`Congratulations ${message.author.username}\nYou have caught a Catfish!`)
      .setColor(message.guild.me.displayHexColor)
      .setImage("https://static.wikia.nocookie.net/animalcrossing/images/2/29/NH-Icon-catfish.png/revision/latest?cb=20200401003129")
      .addFields(
        { name: "Price", value: 800, inline: true },
        { name: "Size", value: "70 cm", inline: true },
        { name: "Rarity", value: "Fairly Common", inline: true}
      )
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

      const embed2 = new Discord.MessageEmbed()
      .setTitle(`Congratulations ${message.author.username}\nYou have caught a Frog!`)
      .setColor(message.guild.me.displayHexColor)
      .setImage("https://static.wikia.nocookie.net/animalcrossing/images/6/6b/NH-Icon-frog.png/revision/latest?cb=20200401003129")
      .addFields(
        { name: "Price", value: 120, inline: true },
        { name: "Size", value: "12 cm", inline: true },
        { name: "Rarity", value: "Common ", inline: true}
      )
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

      const embed3 = new Discord.MessageEmbed()
      .setTitle(`Congratulations ${message.author.username}\nYou have caught a Crawfish!`)
      .setColor(message.guild.me.displayHexColor)
      .setImage("https://static.wikia.nocookie.net/animalcrossing/images/c/cd/NH-Icon-crawfish.png/revision/latest?cb=20200401003129")
      .addFields(
        { name: "Price", value: 200, inline: true },
        { name: "Size", value: "13 cm", inline: true },
        { name: "Rarity", value: "Common", inline: true}
      )
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
      const messages = [embed1, embed2, embed3]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];


      message.channel.send(randomMessage)
  }
};
