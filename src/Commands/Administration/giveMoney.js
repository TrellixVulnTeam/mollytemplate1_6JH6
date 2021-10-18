const Command = require("../../Build/Command");
const currencySchema = require("../../Schema/currencySchema");
const Discord = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "givemoney",
      aliases: ["givemoney"],
      description: "Give money to any member in the server.",
      usage: "<amount>",
      category: "Administration",
      examples: ["!givemoney 500"],
      cooldown: 5,
      userPerms: ["MANAGE_GUILD"]
    });
  }

  async run(message, args) {
    let mentionedMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!mentionedMember) mentionedMember = message.member;

    const amount = args[1];
    if (amount % 1 != 0 || amount <= 0)
      return message.channel.send("You need to give a whole number!");
    try {
      const userBalance = await currencySchema.findOne({
        userID: message.author.id,
      });
      if (!userBalance)
        return message.channel.send(`This user is not in the server or doesn't exist!`);

      await currencySchema.findOneAndUpdate(
        {
          userID: mentionedMember.id,
        },
        {
          $inc: {
            cash: amount,
          },
        }
      );

      return message.channel.send(
        `${message.author.username} gave ${amount} avocoin(s) to ${mentionedMember.user.username}.`
      );
    } catch (err) {
      console.log(err);
    }
  }
};
