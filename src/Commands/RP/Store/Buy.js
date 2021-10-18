const Command = require("../../../Build/Command.js");
const Discord = require("discord.js");
const inventorySchema = require("../../../Schema/inventorySchema");
const currencySchema = require("../../../Schema/currencySchema");
const fs = require("fs");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "buy!",
      aliases: ["buy!"],
      description: "Buy any item avaliable from any shop",
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
    let shop_data = JSON.parse(
      Buffer.from(fs.readFileSync(__dirname + "/shop.json", "utf8")).toString()
    );

    let temp_items = Object.keys(shop_data.pages).map(
      (v) => shop_data.pages[v].items
    );

    let items = [];

    temp_items.forEach((tmp_items) => {
      items = items.concat(tmp_items);
    });

    let item = items.find((v) => v.name === args.join(" ").toLowerCase());

    if (!item) {
      return message.reply(
        errorEmbed
          .setTitle("This is quite embarassing...")
          .setDescription(
            "Couldn't find this item, please make sure it is on the Magic Carpet Shop."
          )
      );
    }

    const userBalance = await currencySchema.findOne({
      guildID: message.guild.id,
      userID: message.author.id,
    });

    if (userBalance.cash < item.cost && userBalance.bank > 0) {
      return message.reply(
        errorEmbed
          .setTitle("This is quite embarassing...")
          .setDescription(
            "You don't have enough avocoins in hand to buy this item, please withdraw some avocoins from your bank account."
          )
      );
    } else if (userBalance.cash < item.cost)
      return message.reply(
        errorEmbed
          .setTitle("This is quite embarassing...")
          .setDescription("You don't have enough avocoins to buy this item!")
      );
    const params = {
      guildID: message.guild.id,
      userID: message.author.id,
    };

    inventorySchema.findOne(params, async (err, data) => {
      if (data) {
        const hasItem = Object.keys(data.inventory).includes(item.name);
        if (!hasItem) {
          data.inventory[item.name] = 1;
        } else {
          data.inventory[item.name]++;
        }
        console.log(data);
        await inventorySchema.findOneAndUpdate(params, data);
      } else {
        new inventorySchema({
          guildID: message.guild.id,
          userID: message.author.id,
          inventory: {
            [item.name]: 1,
          },
        }).save();
      }
      message.channel.send(
        successEmbed
          .setTitle(`Congratulations ${message.author.username}!`)
          .setDescription(`${item.successMessage}\nCheck it in your inventory.`)
          .setThumbnail(`${item.image}`)
      );
      await currencySchema
        .updateOne(
          { guildID: message.guild.id, userID: message.author.id },
          { $inc: { cash: -item.cost } }
        )
        .catch((err) => console.log(err));
    });

    // inventorySchema.findOne(params, async (err, data) => {
    //   const mappedData = Object.keys(data.inventory);
    //   if (mappedData.length === 5) {
    //     return message.reply(
    //       errorEmbed
    //         .setTitle("This is quite embarassing...")
    //         .setDescription(
    //           "Your inventory is full, try to save some of your items in your storage!"
    //         )
    //     );
    //   }
    // });
  }
};
