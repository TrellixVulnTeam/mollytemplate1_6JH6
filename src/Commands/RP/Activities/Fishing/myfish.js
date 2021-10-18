const Command = require("../../../../Build/Command.js");
const Discord = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "myfish",
      aliases: ["myfish"],
      description: "Use your fishing rod and catch a fish",
      category: "Roleplay",
      examples: ["!myfish"],
      cooldown: 5,
    });
  }

  async run(message, args) {

  }
}