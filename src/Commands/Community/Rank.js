const Command = require("../../Build/Command");
const Discord = require("discord.js");
const Levels = require("discord-xp");
const canvacord = require("canvacord");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "rank",
      aliases: ["rank"],
      description: "Display someone's rank ",
      usage: "[@user]",
      category: "Community",
      examples: ["!rank", "!rank @Molly"]
    });
  }

  async run(message, args) {
    let mentionedMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!mentionedMember) mentionedMember = message.member;

    const target = await Levels.fetch(
      mentionedMember.user.id,
      message.guild.id,
      true
    );
  

    if (!target)
      return message.channel.send(
        "The member stated does not have any levels."
      );

    try {
      const rank = new canvacord.Rank()
        .setAvatar(message.author.displayAvatarURL({ format: "png", dynamic: false }))
        .setCurrentXP(target.xp)
        .setLevel(target.level)
        .setRank(target.position)
        .setRequiredXP(Levels.xpFor(target.level + 1))        
        .setStatus(mentionedMember.user.presence.status)        
        .setProgressBar(mentionedMember.displayHexColor)
        .setUsername(mentionedMember.user.username)
        .setDiscriminator(mentionedMember.user.discriminator);

        await rank.build().then((data) => {
        const attachment = new Discord.MessageAttachment(data, "RankCard.png");
        message.channel.send(attachment);
      });
      //   message.channel.send(
      //     `${mentionedMember.user.tag} is level ${target.level} and has ${
      //       target.xp
      //     }/${Levels.xpFor(target.level + 1)}`
      //   );
    } catch (err) {
      console.log(err);
    }
  }
};
