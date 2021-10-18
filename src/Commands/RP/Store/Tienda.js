const Command = require("../../../Build/Command.js");
const Discord = require("discord.js");
const inventorySchema = require("../../../Schema/inventorySchema");
const currencySchema = require("../../../Schema/currencySchema");
const mcs = require("../../../Data/Shop/magiCarpetShop");
const simplydjs = require("simply-djs");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "tienda",
      aliases: ["tienda"],
      description: "Buy any item avaliable from any shop",
      usage: "<item>",
      category: "Economy",
      examples: ["!tienda axe"],
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
    if (mcs.length === 0) {
      return message.reply(
        errorEmbed
          .setTitle("This is quite embarassing...")
          .setDescription(
            "I don't know how to explain this buy we're out of products, please come back later."
          )
      );
    }

    const embed1 = new Discord.MessageEmbed()
      .setTitle("Magic Carpet Store")
      .setColor(message.guild.me.displayHexColor)
      .setDescription("Tools")
      .addFields(
        {
          name: "Axe",
          value: `Description: \`A tool used for chopping trees.\`\nCost: \`200\``,
          inline: false,
        },
        {
          name: "Pickaxe",
          value: `Description: \`A tool used for mining various minerals.\`\nCost: \`250\``,
          inline: false,
        }
      );
    const embed2 = new Discord.MessageEmbed()
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
    const embed3 = new Discord.MessageEmbed()
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

    var pages = [embed1, embed2, embed3];
    simplydjs.embedPages(this.client, message, pages, {
      forwardEmoji: "869429723485310997",
      backEmoji: "869429723342729267",
      color: "green",
    });
  }
};
