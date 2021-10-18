const Command = require("../../../Build/Command.js");
const Discord = require("discord.js");
const inventorySchema = require("../../../Schema/inventorySchema");
const currencySchema = require("../../../Schema/currencySchema");
const mcs = require("../../../Data/Shop/magiCarpetShop");
const fs = require("fs");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "dropitem",
      aliases: ["dropitem", "dropi"],
      description: "save your items from your backpack to your storage",
      usage: "axe",
      category: "Economy",
      examples: ["!dropitem axe"],
      cooldown: 5,
    });
  }

  async run(message, args) {
    const params = {
      guildID: message.guild.id,
      userID: message.author.id,
    };

    const errorEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    const successEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    if (!args[0])
      return message.channel.send(
        errorEmbed
          .setTitle("This is quite embarassing...")
          .setDescription(
            "Remember that you need to pick a valid item from the store."
          )
      );

    let itemToDrop = args[0].toLowerCase();

    const validItem = !!mcs.find((val) =>
      val.item.toLowerCase().includes(itemToDrop)
    );
    if (!validItem)
      return message.channel.send(
        errorEmbed
          .setTitle("This is quite embarassing...")
          .setDescription("This is not a valid item, please try again.")
      );

    inventorySchema.findOne(params, async (err, data) => {
      if (data) {
        const hasItem = Object.keys(data.inventory).includes(
          mcs.find((val) => val.item.toLowerCase().includes(itemToDrop)).item
        );
        if (!hasItem) {
          errorEmbed
            .setTitle("This is quite embarassing...")
            .setDescription(
              "You don't have this item, please check that you have spelled the name correctly."
            );
        } else {
          data.inventory[
            mcs.find((val) => val.item.toLowerCase().includes(itemToDrop)).item
          ]--;
        }
        await inventorySchema.findOneAndUpdate(params, data);
        if (
          data.inventory[
            mcs.find((val) => val.item.toLowerCase().includes(itemToDrop)).item
          ] === 0
        ) {
          await inventorySchema.updateMany(
            delete inventory.itemToDrop
          );
        }
      }
    });
  }
};
