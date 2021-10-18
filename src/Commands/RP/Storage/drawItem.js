const Command = require("../../../Build/Command.js");
const Discord = require("discord.js");
const itemTools = require("../../../Data/Shop/itemTools");
const inventorySchema = require("../../../Schema/inventorySchema");
const currencySchema = require("../../../Schema/currencySchema");
const storageSchema = require("../../../Schema/currencySchema");

const fs = require("fs");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "storeitem",
      aliases: ["drawitem", "drawi"],
      description: "save your items from your backpack to your storage",
      usage: "<storeitem> axe",
      category: "Economy",
      examples: ["!buy axe"],
      cooldown: 5,
    });
  }

  async run(message, args) {}}