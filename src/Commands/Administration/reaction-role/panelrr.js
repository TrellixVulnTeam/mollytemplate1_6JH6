const Command = require("../../../Build/Command.js");
const {
  Client,
  Message,
  MessageEmbed,
  Util,
  ReactionEmoji,
} = require("discord.js");
const RRSchema = require("../../../Schema/reactionRoleSchema");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "panelrr",
      aliases: ["panelrr"],
      category: "Administration",
      userPerms: ["MANAGE_GUILD"],
    });
  }

  async run(message, args) {
    const channel = message.mentions.channels.first() || message.channel;
    RRSchema.findOne({ guildID: message.guild.id }, async (err, data) => {
      if (!data) return message.reply("no data was in here");
      const mapped = Object.keys(data.Roles)
        .map((value, index) => {
          const role = message.guild.roles.cache.get(
            data.Roles[value][0]
            );
          return `${index + 1}) ${
            data.Roles[value][1].raw
          } - ${role}`;
        })
        .join("\n\n");

      channel.send(new MessageEmbed().setDescription(mapped)).then((msg) => {
        data.Message = msg.id;
        data.save();

        const reactions = Object.values(data.Roles).map((val) => val[1].id);
        reactions.map((emoji) => msg.react(emoji));
      });
    });
  }
};
