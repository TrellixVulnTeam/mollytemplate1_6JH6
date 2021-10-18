const Command = require("../../Build/Command");
const currencySchema = require("../../Schema/currencySchema");
const Discord = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "deposit",
      aliases: ["deposit"],
      description: "Deposit your current cash into your bank account.",
      usage: "<amount>",
      category: "Economy",
      examples: ["!deposit 500"],
      cooldown: 5,
    });
  }

  async run(message, args) {
    const amount = args[0];
    if (amount % 1 != 0 || amount <= 0)
      return message.channel.send("Deposited amount must be a whole number");
    try {
      const userBalance = await currencySchema.findOne({
        guildID: message.guild.id,
        userID: message.author.id,
      });
      if (userBalance.cash < amount)
        return message.reply("You don't have that amount of coins to deposit!");

      await currencySchema.findOneAndUpdate(
        {
          guildID: message.guild.id,
          userID: message.author.id,
        },
        {
          $inc: {
            cash: -amount,
            bank: amount,
          },
        }
      );

      return message.channel.send(
        `You deposited ${amount} avocoins into your bank account`
      );
    } catch (err) {
      console.log(err);
    }
  }
};
