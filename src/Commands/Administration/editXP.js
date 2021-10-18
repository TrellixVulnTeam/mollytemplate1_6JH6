const Command = require("../../Build/Command.js");
const Levels = require("discord-xp");
let userSchema = require("../../Schema/userSchema");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "editrank",
      aliases: ["editrank"],
      description: "Modify someone's level and experience",
      usage: "[@user [xp, level] [add, set, remove] <number>]",
      category: "Administration",
      examples: ["!editrank @Molly level set 50"],
      userPerms: ["MANAGE_GUILD"]
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
        `You must state if you're editing the members level or experience.\n${this.usage}`
      );
    if (!["xp", "level"].includes(args[1]))
      return message.channel.send(
        `Your second argument was not xp or level.\n${this.usage}`
      );
    if (args[1] == "xp") {
      if (!["add", "set", "remove"].includes(args[2]))
        return message.channel.send(
          `You have to state if you're adding, setting or remove xp from the user.\n${this.usage}`
        );
      const value = Number(args[3]);
      const levelUser = await Levels.fetch(
        mentionedMember.user.id,
        message.guild.id
      );
      if (!levelUser)
        return message.channel.send(
          "That member is not registered within the database"
        );
      if (args[2] == "add") {
        if (!value)
          return message.channel.send("The number stated is not valid number.");
        try {
          await Levels.appendXp(
            mentionedMember.user.id,
            message.guild.id,
            value
          );
          message.channel.send(
            `Added: ${value} XP to ${mentionedMember.user.tag}`
            
          );
        } catch (err) {
          console.log(err);
        }
      } else if (args[2] == "remove") {
        if (!value)
          return message.channel.send("The number stated is not valid number.");
        try {
          await Levels.subtractXp(
            mentionedMember.user.id,
            message.guild.id,
            value
          );
          message.channel.send(
            `Removed: ${value} XP from ${mentionedMember.user.tag}`
          );
        } catch (err) {
          console.log(err);
        }
      } else if (args[2] == "set") {
        if (!value)
          return message.channel.send("The number stated is not valid number.");
        try {
          await Levels.setXp(mentionedMember.user.id, message.guild.id, value);
          message.channel.send(
            `Settled: ${value} XP for ${mentionedMember.user.tag}`
          );
        } catch (err) {
          console.log(err);
        }
      }
    } else if (args[1] == "level") {
      if (!["add", "set", "remove"].includes(args[2]))
        return message.channel.send(
          `You have to state if you're adding, setting or remove level(s) from the user.\n${this.usage}`
        );
      const value = Number(args[3]);
      const levelUser = await Levels.fetch(
        mentionedMember.user.id,
        message.guild.id
      );
      if (!levelUser)
        return message.channel.send(
          "That member is not registered within the database"
        );
      if (args[2] == "add") {
        if (!value)
          return message.channel.send("The number stated is not valid number.");
        try {
          await Levels.appendLevel(
            mentionedMember.user.id,
            message.guild.id,
            value
          );
          message.channel.send(
            `Added: ${value} level(s) to ${mentionedMember.user.tag}`
          );
        } catch (err) {
          console.log(err);
        }
      } else if (args[2] == "remove") {
        if (!value)
          return message.channel.send("The number stated is not valid number.");
        try {
          await Levels.subtractLevel(
            mentionedMember.user.id,
            message.guild.id,
            value
          );
          message.channel.send(
            `Removed: ${value} level(s) from ${mentionedMember.user.tag}`
          );
        } catch (err) {
          console.log(err);
        }
      } else if (args[2] == "set") {
        if (!value)
          return message.channel.send("The number stated is not valid number.");
        try {
          await Levels.setLevel(mentionedMember.user.id, message.guild.id, value);
          await userSchema
          .updateOne(
            { userID: message.author.id },
            { $set: { level: value } }
          )
          .catch((err) => console.log(err));
          message.channel.send(
            `Settled: ${value} level(s) for ${mentionedMember.user.tag}`
          );
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
