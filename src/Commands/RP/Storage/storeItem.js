const Command = require("../../../Build/Command.js");
const Discord = require("discord.js");
const inventorySchema = require("../../../Schema/inventorySchema");
const mongoose = require("mongoose");
const fs = require("fs");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "storeitem",
      aliases: ["storeitem", "storei"],
      description: "save your items from your backpack to your storage",
      usage: "<storeitem> axe",
      category: "Economy",
      examples: ["!buy axe"],
      cooldown: 5,
    });
  }

  async run(message, args) {
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

    const params = {
      guildID: message.guild.id,
      userID: message.author.id,
    };

    let item = args.join(" ").toLowerCase();

    try {
      inventorySchema.findOne(params, async (err, data) => {
        const itemInv = Object.keys(data.inventory);
        if (itemInv.toString() === item) {
          console.log(item + " " + itemInv.toString());
          await inventorySchema.findOneAndUpdate(
            {
              guildID: message.guild.id,
              userID: message.author.id
            },
            {
              $set: {
             //ACÁ IRÍA EL QUERY FUNCIONAL POR LA PUTA MADRE
              },
            },
            {
              multi: true,
            }
          );
        } else {
          console.log("el item mencionado no se encuentra en el inventairo");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
};
