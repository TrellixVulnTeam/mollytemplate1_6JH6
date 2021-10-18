const Command = require("../../../Build/Command.js");
const {
  Client,
  Message,
  MessageEmbed,
  Util,
  ReactionEmoji,
} = require("discord.js");
const { MessageButton, MessageActionRow } = require("discord-buttons");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "pet",
      aliases: ["pet"],
      category: "Administration",
      userPerms: ["MANAGE_GUILD"],
    });
  }

  async run(message, args) {
    // const embed = new MessageEmbed()
    //   .setTitle("Larry")
    //   .setColor(message.guild.me.displayHexColor)
    //   .setThumbnail(
    //     "https://static.wikia.nocookie.net/habbo/images/2/29/Great_Bear.png/revision/latest?cb=20120827125941&path-prefix=en"
    //   )
    //   .setDescription(
    //     `The White Bear is a hunter pet\nappearance in the Bear family.\n**Level 2**`
    //   )
    //   .addFields(
    //     { name: "Energy", value: "■■■□□", inline: true },
    //     { name: "Health", value: "■■■■■", inline: true },
    //     { name: "Rest", value: "■■■□□□", inline: true }
    //   )
    //   .setFooter(`${message.author.username}'s pet`)
    //   .setTimestamp();

    // const act1 = new MessageButton()
    //   .setStyle("green")
    //   .setLabel("Play")
    //   .setEmoji("🎲")
    //   .setID("playPet");

    // const act2 = new MessageButton()
    //   .setStyle("green")
    //   .setLabel("Dig")
    //   .setEmoji("🐾")
    //   .setID("findPet");

    // const act3 = new MessageButton()
    //   .setStyle("green")
    //   .setLabel("Sleep")
    //   .setEmoji("💤")
    //   .setID("sleepPet");

    // const row = new MessageActionRow().addComponent([act1, act2, act3]);
    // message.channel.send({ component: row, embed: embed });
    message.reply("This command is on development and can be used only by the administrator.");
  }
};
