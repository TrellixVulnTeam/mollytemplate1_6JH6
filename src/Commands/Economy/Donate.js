const Command = require("../../Build/Command");
const currencySchema = require("../../Schema/currencySchema");
const Discord = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "donate",
      aliases: ["donate"],
      description: "Donate money to any member in the server.",
      usage: "<amount>",
      category: "Economy",
      examples: ["!donate 500"],
      cooldown: 5
    });
  }

  async run(message, args) {
    let mentionedMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    const coinsToDonate = args[1];
    if(!coinsToDonate) return message.reply("Please specify an amount of avocoins to donate!");
    if(isNaN(coinsToDonate)) return message.reply("Avocoins must be a number!");

    const convertedDonation = parseInt(coinsToDonate);
    const userBalance = await currencySchema.findOne({
      userID: message.author.id,
    });

    if(userBalance.cash < coinsToDonate) return message.reply("You don't have that amount of avocoins to donate!");

    await currencySchema.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
          cash: -convertedDonation,
        },
      }
    );
    
    await currencySchema.findOneAndUpdate(
      {
        userID: mentionedMember.id,
      },
      {
        $inc: {
          cash: convertedDonation,        
        },
      }
    );
  }
};
