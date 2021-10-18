// https://discord.gg/9RSttbsF
const Command = require("../../Build/Command");
const Discord = require("discord.js");
const { parse } = require("twemoji-parser");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "inv",
      aliases: ["inv"],
      description: "sends the invitation for the new server",
      category: "Community",
      cooldown: 10
    });
  }
  async run(message, args) {
    message.channel.send('https://discord.gg/bfQVd6Qr2V')
  }
}