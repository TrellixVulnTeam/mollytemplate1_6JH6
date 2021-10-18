const Command = require("../../../Build/Command.js");
const Discord = require("discord.js");
const inventorySchema = require("../../../Schema/inventorySchema");
const currencySchema = require("../../../Schema/currencySchema");
const fs = require("fs");
const mcs = require("../../../Data/Shop/magiCarpetShop");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "comprar",
      aliases: ["comprar"],
      description: "Buy any item avaliable from any shop",
      usage: "<item>",
      category: "Economy",
      examples: ["!comprar axe"],
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

    let itemToBuy = args[0].toLowerCase();

    const validItem = !!mcs.find((val) =>
      val.item.toLowerCase().includes(itemToBuy)
    );
    if (!validItem)
      return message.channel.send(
        errorEmbed
          .setTitle("This is quite embarassing...")
          .setDescription("This is not a valid item, please try again.")
      );

    const itemPrice = mcs.find((val) =>
      val.item.toLowerCase().includes(itemToBuy)
    ).price;

    const itemCumulative = mcs.find((val) =>
      val.item.toLowerCase().includes(itemToBuy)
    ).cumulative;

    const userBalance = await currencySchema.findOne({
      guildID: message.guild.id,
      userID: message.author.id,
    });

    if (userBalance.cash < itemPrice && userBalance.bank > 0) {
      return message.reply(
        errorEmbed
          .setTitle("This is quite embarassing...")
          .setDescription(
            "You don't have enough avocoins in hand to buy this item, please withdraw some avocoins from your bank account."
          )
      );
    } else if (userBalance.cash < itemPrice) {
      return message.reply(
        errorEmbed
          .setTitle("This is quite embarassing...")
          .setDescription("You don't have enough avocoins to buy this item!")
      );
    }

    inventorySchema.findOne(params, async (err, data) => {
      if (data) {
        const hasItem = Object.keys(data.inventory).includes(
          mcs.find((val) => val.item.toLowerCase().includes(itemToBuy)).item
        );
        if (!hasItem) {
          data.inventory[
            mcs.find((val) => val.item.toLowerCase().includes(itemToBuy)).item
          ] = 1;
        } else {
          data.inventory[
            mcs.find((val) => val.item.toLowerCase().includes(itemToBuy)).item
          ]++;
        }
        await inventorySchema.findOneAndUpdate(params, data);
        await userBalance.updateOne({
          cash: userBalance.cash - itemPrice,
        });
        message.channel.send(
          successEmbed
            .setTitle(`Congratulations ${message.author.username}!`)
            .setDescription(
              `${
                mcs.find((val) => val.item.toLowerCase().includes(itemToBuy))
                  .successMessage
              }\nCheck it in your inventory.`
            )
            .setThumbnail(
              `${
                mcs.find((val) => val.item.toLowerCase().includes(itemToBuy))
                  .image
              }`
            )
        );
      } else {
        new inventorySchema({
          guildID: message.guild.id,
          userID: message.author.id,
          inventory: {
            [mcs.find((val) => val.item.toLowerCase().includes(itemToBuy))
              .item]: 1,
          },
        })
          .save()
          .catch((err) => console.log(err));
        await userBalance.updateOne({
          cash: userBalance.cash - itemPrice,
        });
        message.channel.send(
          successEmbed
            .setTitle(`Congratulations ${message.author.username}!`)
            .setDescription(
              `${
                mcs.find((val) => val.item.toLowerCase().includes(itemToBuy))
                  .successMessage
              }\nCheck it in your inventory.`
            )
            .setThumbnail(
              `${
                mcs.find((val) => val.item.toLowerCase().includes(itemToBuy))
                  .image
              }`
            )
        );
      }
    });
  }
};
