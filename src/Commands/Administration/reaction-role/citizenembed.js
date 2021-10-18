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
      name: "citizenembed",
      aliases: ["citizenembed"],
      category: "Administration",
      userPerms: ["MANAGE_GUILD"],
    });
  }

  async run(message, args) {
    message.delete();
    const Newbie = message.guild.roles.cache.find(role => role.name == "Newbie");

    const embed = new MessageEmbed()
    .setTitle("Apply for Avocado City Citizenship!")
    .setColor(message.guild.me.displayHexColor)
    .setDescription(
      `React below and get your ID to become a Legal Citizen.\nRemember that you'll need at least the role ${Newbie} to apply!`
    )

    const agree = new MessageButton()
    .setStyle("green")
    .setLabel("🥑")
    .setID("citizenButton");

  const row = new MessageActionRow().addComponent([agree]);

  message.channel.send({ component: row, embed: embed });
  }
};
