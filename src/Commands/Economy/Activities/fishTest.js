const Command = require("../../../Build/Command.js");
const Discord = require("discord.js");
const itemTools = require("../../../Data/Shop/itemTools");
const balance = require("../../../Schema/currencySchema");
const inventorySchema = require("../../../Schema/inventorySchema");
const currencySchema = require("../../../Schema/currencySchema");
const fishList = require("../../../Data/Animals/fishList");
const riverFish = require("../../../Data/Animals/Fish/riverFish");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "fishtest",
      aliases: ["fishtest"],
      description: "Use your fishing rod and catch a fish",
      category: "Economy",
      examples: ["!fishtest"],
      cooldown: 30
    });
  }

  async run(message, args) {
    const params = {
      userID: message.author.id,
    };

    const fishingRod = "fishing rod";
    const fishingBait = "fishing bait";

    const successEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    if (message.channel.id === "756689418839916665" || message.channel.id === "854869774337441812") {
      inventorySchema.findOne(params, async (err, data) => {
        if (data) {
          const hasItem = Object.keys(data.inventory).includes(fishingRod);
          const hasBait = Object.keys(data.inventory).includes(fishingBait);
          if (!hasItem) {
            message.reply(
              "You don't have a ``Fishing Rod`` or a ``Bait``, please go to the shop and buy one!"
            );
          } else {
            var rand = riverFish[(Math.random() * riverFish.length) | 0];
            console.log(rand);
            message.channel.send(
              successEmbed
                .setTitle(`You've caught a ${rand.name}!`)
                .addFields(
                  { name: "Price", value: `${rand.price}`, inline: true },
                  { name: "Size", value: `${rand.size}`, inline: true },
                  { name: "Rarity", value: `${rand.rarity}`, inline: true }
                )
                .setImage(rand.image)
            );
            inventorySchema.findOne(params, async (err, data) => {
              if (data) {
                const hasItem = Object.keys(data.inventory).includes(rand.name);
                if (!hasItem) {
                  data.inventory[rand.name] = 1;
                } else {
                  data.inventory[rand.name]++;
                }
                console.log(data);
                await inventorySchema.findOneAndUpdate(params, data);
              } else {
                new inventorySchema({
                  userID: message.author.id,
                  inventory: {
                    [rand.name]: 1,
                  },
                }).save();
              }
            });
          }
        }
      });
    } else if (message.channel.id === "863466183285538876") {
    } else {
      message.reply("You can't use the fishing rod here!");
    }
  }
};

const returnFish = function (fish) {
  if (fish.percentage === 20) {
    return fish.name;
  }
};
