const Command = require("../../../../Build/Command.js");
const Discord = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "catchfish",
      aliases: ["catchfish"],
      description: "Use your fishing rod and catch a fish",
      category: "Roleplay",
      examples: ["!catchfish"],
      cooldown: 5,
    });
  }

  async run(message, args) {

  }
}