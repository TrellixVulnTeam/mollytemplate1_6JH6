const Command = require("../../../Build/Command.js");
const Discord = require("discord.js");
const fs = require("fs");
const { MessageButton, MessageActionRow } = require("discord-buttons");
const simplydjs = require("simply-djs");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "shop",
      aliases: ["shop"],
      usage: "",
      description: "You can check everything that is for sale",
      category: "Roleplay",
      examples: ["!shop"],
      cooldown: 5,
    });
  }

  async run(message, args) {
    let shop_data = JSON.parse(
      Buffer.from(fs.readFileSync(__dirname + "/shop.json", "utf8")).toString()
    );
    let index = args[0] || "1";
    let page = shop_data.pages[index];

    if (!page) {
      return message.channel.send("no page found");
    }

    const shop = new Discord.MessageEmbed()
      .setTitle("Shop")
      .setColor(message.guild.me.displayHexColor);

    for (let item of page.items) {
      if ("hidden" in item) {
        if (!item.hidden) {
          continue;
        }
      }
      shop.setDescription(`${item.category}`);
      shop.addField(
        item.name.charAt(0).toUpperCase() + item.name.slice(1),
        `Description: \`${item.description || "None"}\`\nCost: \`${
          item.cost || "Null"
        }\``
      );
    }

    const shop1 = new Discord.MessageEmbed()
      .setTitle("Magic Carpet Store")
      .setColor(message.guild.me.displayHexColor)
      .setDescription("Materials")
      .addFields(
        {
          name: "Stack of Wood",
          value: `Description: \`Well, it's just wood.\`\nCost: \`20\``,
          inline: false,
        },
        {
          name: "Clump of Weeds",
          value: `Description: \`Fresh woods just taken from the ground.\`\nCost: \`15\``,
          inline: false,
        }
      );

    const shop2 = new Discord.MessageEmbed()
      .setTitle("Magic Carpet Store")
      .setColor(message.guild.me.displayHexColor)
      .setDescription("Food")
      .addFields(
        {
          name: "Apple",
          value: `Description: \`An apple in its nonjuice form.\`\nCost: \`10\``,
          inline: false,
        },
        {
          name: "Energy Drink",
          value: `Description: \`Just one bottle will get rid of your tiredness.\`\nCost: \`20\``,
          inline: false,
        }
      );
    var pages = [shop, shop1, shop2];
    simplydjs.embedPages(this.client, message, pages, {
      forwardEmoji: "869429723485310997", // default: ⏩
      backEmoji: "869429723342729267", // default: ⏪
      color: "green", // default: blurple

      // Colors that discord-buttons support. like red, blurple, grey, green
    });
  }
};
