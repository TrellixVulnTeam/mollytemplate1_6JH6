const Command = require("../../../Build/Command.js");
const { Client, Message, MessageEmbed, Util, ReactionEmoji } = require("discord.js");
const RRSchema = require("../../../Schema/reactionRoleSchema");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "addrr",
      aliases: ["addrr"],
      category: "Administration",
      userPerms: ["MANAGE_GUILD"],
    });
  }

  async run(message, args) {
    const role = message.mentions.roles.first();

    let [, emoji] = args;
    if (!emoji) return message.reply("Pleace specify a emoji!");

    const parsedEmoji = Util.parseEmoji(emoji);

    RRSchema.findOne({ guildID: message.guild.id }, async (err, data) => {
      if (data) {
        data.Roles[parsedEmoji.name] = [
          role.id,
          {
            id: parsedEmoji,
            raw: emoji,
          },
        ];

        await RRSchema.findOneAndUpdate({ guildID: message.guild.id }, data);
      } else {
          new RRSchema({
              guildID: message.guild.id,
              message: 0,
              Roles: {
                [parsedEmoji.name] : [                      
                    role.id,
                      {
                          id: parsedEmoji.id,
                          raw: emoji
                      }
                  ]
              }
          }).save();
      }
      message.channel.send("New role added.")
    });
  }
};
