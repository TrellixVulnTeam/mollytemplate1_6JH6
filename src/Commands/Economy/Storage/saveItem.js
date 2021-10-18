const Command = require("../../../Build/Command");
const backpackSchema = require("../../../Schema/backpackSchema");
const Discord = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "saveItem",
      aliases: ["saveitem",],
      description: "Saves a item from your backpack to your inventory.",
      usage: "<itemname>",
      category: "Economy",
      examples: ["!saveitem"],
      cooldown: 5,
    });
  }

  async run(message, args) {

  }
};
