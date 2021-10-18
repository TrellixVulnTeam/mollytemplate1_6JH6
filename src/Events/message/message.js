const Event = require("../../Build/Event");
const { Permissions, Collection, MessageEmbed } = require("discord.js");
const moment = require("moment");
const Discord = require("discord.js");
require("moment-duration-format");
const Levels = require("discord-xp");
let userSchema = require("../../Schema/userSchema");
const afk = require("../../Schema/afkSchema");
const { isBuffer } = require("util");
const { RateLimiter } = require("discord.js-rate-limiter");
const currencySchema = require("../../Schema/currencySchema");
const transcriptSchema = require("../../Schema/transcriptSchema");

module.exports = class extends Event {
  constructor(...args) {
    super(...args);
    this.impliedPermissions = new Permissions([
      "VIEW_CHANNEL",
      "SEND_MESSAGES",
      "SEND_TTS_MESSAGES",
      "EMBED_LINKS",
      "ATTACH_FILES",
      "READ_MESSAGE_HISTORY",
      "MENTION_EVERYONE",
      "USE_EXTERNAL_EMOJIS",
      "ADD_REACTIONS",
    ]);

    this.ratelimits = new Collection();
    this.profileData = new Collection();
  }

  async run(message) {
    try {
      if (!message.author.bot && !message.channel.type === "dm") {
        let newUser = await userSchema.findOne({
          guildID: message.guild.id,
          userID: message.author.id,
        });
        const user = await Levels.fetch(message.author.id, message.guild.id);
        if (!newUser) {
          newUser = await new userSchema({
            guildID: message.guild.id,
            userID: message.author.id,
            userNicknTag: message.author.tag,
            level: user.level,
          });
          console.log(
            `A new user has joined. nick = ${message.author.tag}, id = ${message.author.id}.\nEste mensaje irá luego en un embed que solo podrá ver el staff.`
          );
          await newUser.save().catch((err) => console.log(err));
        }
      }
      if (!message.author.bot && !message.channel.type == "dm") {
        const randomXP = Math.floor(Math.random() * (10 - 1) + 1);
        const hasLeveledUp = await Levels.appendXp(
          message.author.id,
          message.guild.id,
          randomXP
        );

        if (hasLeveledUp) {
          const user = await Levels.fetch(message.author.id, message.guild.id);

          await userSchema
            .updateOne(
              { userID: message.author.id },
              { $set: { userNicknTag: message.author.tag, level: user.level } }
            )
            .catch((err) => console.log(err));

          message.channel.send(
            `${message.member} has levelled up to level ${user.level}!. Keep talking to gain more levels!`
          );

          if (user.level == 5) {
            let role = message.guild.roles.cache.find(
              (role) => role.name == "Newbie"
            );
            if (!role)
              await message.guild.roles
                .create({
                  data: {
                    name: "Newbie",
                    color: "#61a6bd",
                  },
                })
                .catch((err) => console.log(err));
            role = message.guild.roles.cache.find(
              (role) => role.name == "Newbie"
            );
            if (message.member.roles.cache.has(role.id)) return;
            else await message.member.roles.add(role.id);
          }
        }
      }

      if (await afk.findOne({ userID: message.author.id })) {
        let afkProfile = await afk.findOne({ userID: message.author.id });
        if (afkProfile.messagesleft == 0) {
          await afk.findOneAndDelete({ userID: message.author.id });
          message.channel.send("You have been taken out of AFK mode.");
        } else {
          await afk.findOneAndUpdate(
            { userID: message.author.id },
            { messagesleft: afkProfile.messagesleft - 1 }
          );
        }
      }
      // if (!message.author.bot || message.mentions.members.first()) {
      if (!message.author.bot && !message.channel.type == "dm") {
        await message.mentions.members.forEach(async (member) => {
          let afkProfile = await afk.findOne({ userID: member.user.id });
          if (afkProfile)
            message.reply(
              `${member.user.tag} is currently on AFK mode.\n**Reason:** ${afkProfile.reason}`
            );
        });
      }

      //add messages to transcript schema
      if (!message.author.bot) {
        let category = this.client.channels.cache.find(c => c.name == "SUPPORT AND MODERATION🔧" && c.type == "category")
        if (category) {
          await transcriptSchema.findOne(
            { channel: message.channel.id },
            async (err, data) => {
              if (err) throw err;
              if (data) {
                data.content.push(`${message.author.tag} : ${message.content}`);
              } else {
                data = new transcriptSchema({
                  channel: message.channel.id,
                  content: `${message.author.tag} : ${message.content}`,
                });
              }
              await data.save().catch((err) => console.log(err));
            }
          );
        } else {
          return;
        }
      }

      const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
      const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);

      if (message.author.bot) return;

      if (message.content.match(mentionRegex))
        message.channel.send(
          `My prefix for ${message.guild.name} is \`${this.client.prefix}\`.`
        );

      const prefix = message.content.match(mentionRegexPrefix)
        ? message.content.match(mentionRegexPrefix)[0]
        : this.client.prefix;

      if (!message.content.startsWith(prefix)) return;
      const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

      const command =
        this.client.commands.get(cmd.toLowerCase()) ||
        this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
      if (command) {
        if (
          command.ownerOnly &&
          !this.client.utils.checkOwner(message.author.id)
        ) {
          return message.reply(
            "Sorry, this command can only be used by the bot owners."
          );
        }

        if (command.guildOnly && !message.guild) {
          return message.reply(
            "Sorry, this command can only be used in a discord server."
          );
        }

        if (command.nsfw && !message.channel.nsfw) {
          return message.reply(
            "Sorry, this command can only be ran in a NSFW marked channel."
          );
        }

        if (command.disabled) {
          message.delete();
          return message
            .reply(
              "Sorry, this command has been disabled by a developer or the owner."
            )
            .then((s) => {
              message.delete().catch(() => {});
              s.delete({ timeout: 4000 }).catch(() => {});
            })
            .catch(() => {});
        }

        if (command.args && !args.length) {
          return message.reply(
            `Sorry, this command requires arguments to function. Usage: ${
              command.usage
                ? `${this.client.prefix + command.name} ${command.usage}`
                : "This command doesn't have a usage format"
            }`
          );
        }

        if (message.guild) {
          const userPermCheck = command.userPerms
            ? this.client.defaultPerms.add(command.userPerms)
            : this.client.defaultPerms;
          if (userPermCheck) {
            const missing = message.channel
              .permissionsFor(message.member)
              .missing(userPermCheck);
            if (missing.length) {
              return message.reply(
                `You are missing ${this.client.utils.formatArray(
                  missing.map(this.client.utils.formatPerms)
                )} permissions, you need them to use this command!`
              );
            }
          }

          const botPermCheck = command.botPerms
            ? this.client.defaultPerms.add(command.botPerms)
            : this.client.defaultPerms;
          if (botPermCheck) {
            const missing = message.channel
              .permissionsFor(this.client.user)
              .missing(botPermCheck);
            if (missing.length) {
              return message.reply(
                `I am missing ${this.client.utils.formatArray(
                  missing.map(this.client.utils.formatPerms)
                )} permissions, I need them to run this command!`
              );
            }
          }
        }
        const rateLimit = this.ratelimit(message, cmd);

        let number = Math.floor(Math.random() * 9) + 1;
        if (typeof rateLimit === "string")
          return message.channel
            .send(
              `Please wait **${rateLimit}** before running the **${cmd}** command again - ${
                message.author
              }\n\n${number === 1 ? "*It's not time yet*" : ""}${
                number === 2 ? "*You need to be more patient*" : ""
              }`
            )
            .then((s) => {
              message.delete().catch(() => {});
              s.delete({ timeout: 4000 }).catch(() => {});
            })
            .catch(() => {});
        command.run(message, args);
      }
    } catch (e) {
      console.log(e);
    }
  }

  ratelimit(message, cmd) {
    try {
      const command =
        this.client.commands.get(cmd.toLowerCase()) ||
        this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
      if (message.author.permLevel > 4) return false;

      const cooldown = command.cooldown * 1000;
      const ratelimits = this.ratelimits.get(message.author.id) || {}; // get the ENMAP first.
      if (!ratelimits[command.name])
        ratelimits[command.name] = Date.now() - cooldown; // see if the command has been run before if not, add the ratelimit
      const difference = Date.now() - ratelimits[command.name]; // easier to see the difference
      if (difference < cooldown) {
        // check the if the duration the command was run, is more than the cooldown
        return moment
          .duration(cooldown - difference)
          .format("D [days], H [hours], m [minutes], s [seconds]", 1); // returns a string to send to a channel
      } else {
        ratelimits[command.name] = Date.now(); // set the key to now, to mark the start of the cooldown
        this.ratelimits.set(message.author.id, ratelimits); // set it
        return true;
      }
    } catch (e) {
      this.client.emit("fatalError", e, message);
    }
  }
};
