const Command = require("../../Build/Command");
const Discord = require("discord.js");
const Levels = require("discord-xp");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "leaderboard",
      aliases: ["leaderboard", "lb"],
      description: "Display the most leveled members",
      usage: "[]",
      category: "Community",
      examples: ["!leaderboard"],
      cooldown: 10,
    });
  }

  async run(message, args, client) {
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
    if (rawLeaderboard.length < 1)
      return reply("Nobody is on the leaderboard yet.");

    const leaderboard = await Levels.computeLeaderboard(
      this.client,
      rawLeaderboard,
      true
    );

    const rank = leaderboard.map((e) => `${e.position}. ${e.username}#${e.discriminator}`).join("\n");
    const lvl = leaderboard.map((e) => `${e.level}`).join("\n");
    const xp = leaderboard.map((e) => `${e.xp.toLocaleString()}`).join("\n");

    const embed = new Discord.MessageEmbed()
      .setTitle("Avocado Leaderboard")
      .setColor(message.guild.me.displayHexColor)
      .addField(
        "Rank",
        `${rank}`,
        true
      )
      .addField(
        "Level",
        `${lvl}`,
        true
      )
      .addField(
        "XP",
        `${xp}`,
        true
      )
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
    message.channel.send(embed);
  }
};
