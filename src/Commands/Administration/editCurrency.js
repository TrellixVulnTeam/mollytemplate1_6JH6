const Command = require("../../Build/Command.js");
const Levels = require("discord-xp");
let currencySchema = require("../../Schema/currencySchema");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "editcurrency",
      aliases: ["editcurrency"],
      description: "Modify someone's currency :P",
      usage: "[@user [add, remove, set] <number>]",
      category: "Administration",
      examples: ["!editcurrency @Molly add 50"],
      userPerms: ["MANAGE_GUILD"],
    });
  }
  async run(message, args) {
    const mentionedMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!mentionedMember)
      return message.channel.send(
        "The user mentioned is not on the server or does not exist."
      );

    if (!args[1])
      return message.channel.send(
        `You must state if you're adding or removing coins.\n${this.usage}`
      );

    if (!["add", "remove", "set"].includes(args[1]))
      return message.channel.send(
        `Your second argument was not add, remove or set.\n${this.usage}`
      );

    if (args[1] == "add") {
      const value = Number(args[2]);
      if (!value)
        return message.reply(
          "You need to specify the amount of coins you are giving to."
        );
      await currencySchema
        .updateOne({ userID: mentionedMember.id }, { $inc: { cash: value } })
        .catch((err) => console.log(err));
      message.channel.send(
        `Added: ${value} avocoins to ${mentionedMember.user.tag}`
      );
    } else if (args[1] == "remove") {
      const value = Number(args[2]);
      if (!value)
        return message.reply(
          "You need to specify the amount of coins you are removing."
        );
      await currencySchema
        .updateOne({ userID: mentionedMember.id }, { $inc: { cash: -value } })
        .catch((err) => console.log(err));
      message.channel.send(
        `Removed: ${value} avocoins from ${mentionedMember.user.tag}`
      );
    } else if (args[1] == "set") {
      const value = Number(args[2]);
      if (!value)
        return message.reply(
          "You need to specify the amount of coins you are setting."
        );
      await currencySchema
        .updateOne({ userID: mentionedMember.id }, { $set: { cash: value } })
        .catch((err) => console.log(err));
      message.channel.send(
        `Settled: ${value} avocoins for ${mentionedMember.user.tag}`
      );
    }
  }
};
