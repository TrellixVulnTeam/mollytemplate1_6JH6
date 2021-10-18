const Command = require("../../../Build/Command");
const backpackSchema = require("../../../Schema/backpackSchema");
const Discord = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "equipItem",
      aliases: ["equipitem",],
      description: "Equip a item from your inventory to your backpack.",
      usage: "<itemname>",
      category: "Economy",
      examples: ["!equipitem"],
      cooldown: 5,
    });
  }

  async run(message, args) {

  }
};
