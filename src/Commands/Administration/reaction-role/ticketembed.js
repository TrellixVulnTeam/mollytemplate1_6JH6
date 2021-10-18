const Command = require("../../../Build/Command.js");
const { MessageButton, MessageActionRow } = require("discord-buttons");
const {
  Client,
  Message,
  MessageEmbed,
  Util,
  ReactionEmoji,
} = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "ticketembed",
      aliases: ["ticketembed"],
      category: "Administration",
      userPerms: ["MANAGE_GUILD"],
    });
  }

  async run(message, args) {
    message.delete();
    const embed = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .addFields(
        {
          name: "General",
          value: "If you need help with general\n discord/bot support please select: 🔧",
          inline: false,
        },
        {
          name: "Report",
          value:
            "If you need to make a report for a\n moderator to analyze it select: 🚔",
          inline: false,
        },
        {
          name: "Items",
          value:
            "If you have lost an object due to a bug\n and wish to claim it select: 🔎",
          inline: false,
        },
        {
          name: "Discord",
          value:
            "If you have a technical problem with\n the Discord, either with the verification,\n messaging, levels, ranks or any other \nproblem related to it, react with: 📑",
          inline: false,
        },
        {
          name: "Bugs",
          value:
            "If you want to report a bug or glitches\n on the server select: 🐞",
          inline: false,
        },
        {
          name: "Others",
          value:
            "If you need help with anything else\n not listed here, select: ♻️",
          inline: false,
        }
      )
      .setFooter(
        "We reserve the right to ban anyone who opens \na ticket in order to play with our time and annoy us."
      );

    const general = new MessageButton()
      .setStyle("green")
      .setLabel("🔧")
      .setID("generalButton");
    const report = new MessageButton()
      .setStyle("green")
      .setLabel("🚔")
      .setID("reportButton");
    const items = new MessageButton()
      .setStyle("green")
      .setLabel("🔎")
      .setID("itemsButton");
    const discord = new MessageButton()
      .setStyle("green")
      .setLabel("📑")
      .setID("discordButton");
    const blankspace1 = new MessageButton()
      .setStyle("gray")
      .setLabel("ㅤ")
      .setDisabled()
      .setID("blankspace");
    const blankspace2 = new MessageButton()
      .setStyle("gray")
      .setLabel("ㅤ")
      .setDisabled()
      .setID("blankspace");
    const bugs = new MessageButton()
      .setStyle("green")
      .setLabel("🐞")
      .setID("bugsButton");
    const others = new MessageButton()
      .setStyle("green")
      .setLabel("♻️")
      .setID("othersButton");
    const row1 = new MessageActionRow().addComponent([
      general,
      report,
      items,
      discord,
    ]);
    const row2 = new MessageActionRow().addComponent([bugs, blankspace2, blankspace1, others]);

    message.channel.send({ components: [row1, row2], embed: embed });

  }
};
