const Command = require("../../../../Build/Command.js");
const Discord = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "fish",
      aliases: ["fish"],
      description: "Use your fishing rod and catch a fish",
      category: "Roleplay",
      examples: ["!fish"],
      cooldown: 5,
    });
  }

  async run(message, args) {
    var fishes = ["🍤", "🐟", "🐠", "🐡"];
    var randomFishes = Math.floor(Math.random() * fishes.length);
    const filter = (m) => m.content.includes("!catch");

    const embed = new Discord.MessageEmbed()
      .setTitle(`New fish appeared!`)
      .setDescription(
        `${fishes[randomFishes]}\n**type !catch to save the fish in your bag, otherwise it will escape!**`
      )
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed).then((msg) => {
      message.channel
        .awaitMessages(filter, { max: 1, time: 10000, errors: ["time"] })
        .then((collected) => {
          const successembed = new Discord.MessageEmbed()
            .setTitle("Congratulations")
            .setDescription(
              `${
                collected.first().author
              } you got the fish, you can check it in your inventory!`
            )
            .setColor(message.guild.me.displayHexColor);
          msg.edit(successembed);
        })
        .catch((collected) => {
          const failembed = new Discord.MessageEmbed()
            .setTitle("the fish ran away, better luck next time!")
            .setColor(message.guild.me.displayHexColor);
          msg.edit(failembed);
        });
    });
  }
};
