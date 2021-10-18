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
      name: "langembed",
      aliases: ["langembed"],
      category: "Administration",
      userPerms: ["MANAGE_GUILD"],
    });
  }

  async run(message, args) {
    message.delete();
    const embed = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle("Language Role Selector")
      .setDescription(
        "Please select one of the following languages to\nunlock an exclusive channel!\n\n**Remember that we choose languages depending\non the native language of our staff to it could be easy\nfor us to moderate. The language roles are not only\nto open specific channels, but also for the attention\nof your ticket, you will be attending depending on\nthe role you pick.**"
      );
    const enRole = new MessageButton()
      .setStyle("green")
      .setLabel("English")
      .setEmoji(`🇬🇧`)
      .setID("enroleButton");
    const esRole = new MessageButton()
      .setStyle("green")
      .setLabel("Español")
      .setEmoji(`🇪🇸`)
      .setID("esroleButton");
    const plRole = new MessageButton()
      .setStyle("green")
      .setLabel("Polska")
      .setEmoji(`🇵🇱`)
      .setID("plroleButton");
    const row11 = new MessageActionRow().addComponent([enRole, esRole, plRole]);
    message.channel.send({ components: [row11], embed: embed });
  }
};
