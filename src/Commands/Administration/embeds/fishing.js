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
      name: "fishingtest",
      aliases: ["fishingtest"],
      category: "Administration",
      userPerms: ["MANAGE_GUILD"],
    });
  }

  async run(message, args) {
    const member = message.member;

    const embed = new MessageEmbed()
      .setTitle("this is a test for fishing command")
      .setColor(message.guild.me.displayHexColor);

    const agree = new MessageButton()
      .setStyle("green")
      .setLabel("Catch")
      .setEmoji("🎣")
      .setID("catchFish");

    const row = new MessageActionRow().addComponent([agree]);

    message.channel.send({ component: row, embed: embed }).then((message) => {
      const filter = (button) => button.clicker.user.id === member.id; // To Check If User Who Clicked Button Is Same As Who Used Command
      const collector = message.createButtonCollector(filter, { time: 10000 });
      collector.on("collect", async (button) => {
        if (button.id === "catchFish") {
          let successEmbed = new MessageEmbed()
            .setTitle("Congratulations")
            .setDescription(
              `you got the fish, you can check it in your inventory!`
            )
            .setColor(message.guild.me.displayHexColor);
          collector.stop();
          message.edit({ button: null, embed: successEmbed });
        }
      });
      collector.on("end", async (button) => {
        let failureEmbed = new MessageEmbed()
          .setDescription("the fish ran away, better luck next time!")
          .setColor(message.guild.me.displayHexColor);
        collector.stop();
        message.edit({ button: null, embed: failureEmbed });
      });
    });
  }
};
