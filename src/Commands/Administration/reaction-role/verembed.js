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
      name: "verembed",
      aliases: ["verembed"],
      category: "Administration",
      userPerms: ["MANAGE_GUILD"],
    });
  }

  async run(message, args) {
    message.delete()
    const embed = new MessageEmbed()
      .setTitle("Verification Step")
      .setColor(message.guild.me.displayHexColor)
      .setDescription(
        "Welcome to Avocado Online, please take a moment to read this message:"
      )
      .addFields(
        {
          name: "Getting Verified",
          value:
            "**To agree to the rules and recieve permission to view all of our channels and send messages, click on the button below.** You're responsible for reading the contents of this channel before agreeing.",
        },
        { name: "\u200B", value: "\u200B" },
        {
          name: "\u200B",
          value:
            "**We (Avocado Online) cannot and will not be held liable for any damages or losses that result from your use of this server, the provided channels, direct messages, or any other form of communication or transaction that arise from using the aforementioned for any purpose, You agree to this by using all the features of the server.**\nThis server is currently in its beta phase and is subject to progression resets.",
          inline: true,
        }
      );

    const agree = new MessageButton()
      .setStyle("green")
      .setLabel("I agree with the terms of this server.")
      .setID("verificationButton");

    const row = new MessageActionRow().addComponent([agree]);

    message.channel.send({ component: row, embed: embed });
  }
};
