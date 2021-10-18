const Command = require("../../../Build/Command.js");
const Discord = require("discord.js");
const itemTools = require("../../../Data/Shop/itemTools");
const balance = require("../../../Schema/currencySchema");
const inventorySchema = require("../../../Schema/inventorySchema");
const currencySchema = require("../../../Schema/currencySchema");
const fs = require('fs');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "buyt",
      aliases: ["buyt"],
      description: "Buy any item avaliable from the shop",
      usage: "<item>",
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

    if (!args[0])
      return message.reply("Please specify the item you wanna buy.");
    const itemToBuy = args.join(' ').toLowerCase();

    const validItem = !!itemTools.find(
      (val) => val.item.toLocaleLowerCase() == itemToBuy
    );
    if (!validItem)
      return message.reply("The item that you mentioned is not valid!");

    const itemPrice = itemTools.find(
      (val) => val.item.toLocaleLowerCase() === itemToBuy
    ).price;

    const toolImage = itemTools.find(
      (val) => val.item.toLocaleLowerCase() === itemToBuy
    ).image;

    const userBalance = await currencySchema.findOne({
      userID: message.author.id,
    });
    if (userBalance.cash < itemPrice)
      return message.reply("You don't have enough avocoins to buy this item!");

    const params = {
      userID: message.author.id,
    };

    inventorySchema.findOne(params, async (err, data) => {
      if (data) {
        const hasItem = Object.keys(data.inventory).includes(itemToBuy);
        if (!hasItem) {
          data.inventory[itemToBuy] = 1;
        } else {
          data.inventory[itemToBuy]++;
        }
        console.log(data);
        await inventorySchema.findOneAndUpdate(params, data);
      } else {
        new inventorySchema({
          userID: message.author.id,
          inventory: {
            [itemToBuy]: 1,
          },
        }).save();
      }
      message.channel.send(
        successEmbed
          .setTitle(`You bought this item!`)
          .setDescription(
            `Congratulations ${message.author.username}\nyou just bought a new ${itemToBuy.charAt(0).toUpperCase() + itemToBuy.slice(1)}!`
          )
          .setImage(toolImage)
      );
      await currencySchema
        .updateOne(
          { userID: message.author.id },
          { $inc: { cash: -itemPrice } }
        )
        .catch((err) => console.log(err));
    });
  }
};
