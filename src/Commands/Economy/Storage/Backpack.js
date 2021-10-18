const Command = require("../../../Build/Command");
const backpackSchema = require("../../../Schema/backpackSchema");
const Discord = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "backpack",
      aliases: ["backpack",],
      description: "Display all your current items in your backpack.",
      usage: "",
      category: "Economy",
      examples: ["!backpack"],
      cooldown: 5,
    });
  }

  async run(message, args) {

  }
};
