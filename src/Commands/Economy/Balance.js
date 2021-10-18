const Command = require("../../Build/Command");
const currencySchema = require("../../Schema/currencySchema");
const Discord = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "balance",
      aliases: ["balance"],
      description: "Show your current balance.",
      usage: "@user",
      category: "Economy",
      examples: ["!balance", "!balance @Molly"],
      cooldown: 5,
    });
  }

  async run(message, args) {
    const successEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    let mentionedMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!mentionedMember) mentionedMember = message.member;
    let currencyProfile = await currencySchema.findOne({
      guildID: message.guild.id,
      userID: mentionedMember.id,
    });
    if (!currencyProfile) {
      currencyProfile = await new currencySchema({
        guildID: message.guild.id,
        userID: mentionedMember.id,
        lastedEdited: Date.now(),
      });
      await currencyProfile.save().catch((err) => console.log(err));
    }

    message.channel.send(
      successEmbed
        .setTitle(`${mentionedMember.user.username}'s Balance`)
        .addFields(
          { name: "💵 Current Cash:", value: `${currencyProfile.cash} av.` },
          { name: "🏛️ Deposited Cash:", value: `${currencyProfile.bank} av.` },
          {
            name: "💰 Total Wealth:",
            value: `${currencyProfile.cash + currencyProfile.bank} av.`,
          }
        )
    );
  }
};
