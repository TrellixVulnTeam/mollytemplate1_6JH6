const Command = require("../../Build/Command.js");
const afkSchema = require("../../Schema/afkSchema");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "editafk",
      aliases: ["editafk"],
      description:
        "Modify someone's AFK reason in case it contains inappropriate words.",
      usage: "[@user]",
      category: "Administration",
      examples: ["!editafk @Molly"],
      userPerms: ["MANAGE_GUILD"],
    });
  }

  async run(message, args) {
    const mentionedMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!mentionedMember)
      return message.channel.send(
        "The member mentioned does not exist or is not on this server!"
      );
    await afkSchema.findOneAndDelete({ userID: mentionedMember.id });
    message.channel.bulkDelete(2, true)
    message.channel.send(
      "Your AFK mode has been removed because it contains words that are against the rules."
    );
  }
};
