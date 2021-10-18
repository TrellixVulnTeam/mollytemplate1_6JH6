const Event = require("../../Build/Event");
const Discord = require("discord.js");

module.exports = class extends Event {
  async run(oldMember, newMember) {
    try {
      const oldStatus = oldMember.premiumSince;
      const newStatus = newMember.premiumSince;

      const boostEmbed = new Discord.MessageEmbed()
        .setTitle(`WE HAVE NEW BOOSTER <:NitroBoostEmoji:852630438006620190>`)
        .setDescription(
          `**${
            newMember.user.tag
          }** has just boosted the server! Thank you so much for your support ✨.\n Because of you now we are at **${
            newMember.guild.premiumSubscriptionCount || "0"
          }** boosts (**Boost Tier: ${
            newMember.guild.premiumTier
              ? `Tier ${newMember.guild.premiumTier}`
              : "None"
          }**).\n**What do I get as a booster in Avocado Online?**\n\nHere are some of the **amazing** features:\n<:pinksmalldot:854878585205948436>Awesome booster role with an **exclusive colour**.\n<:pinksmalldot:854878585205948436>Get way **more money** than normal in all minigames.\n<:pinksmalldot:854878585205948436>Create temporary **private voice and text channels**.\n<:pinksmalldot:854878585205948436>An hourly command to get coins **FASTER**.\n<:pinksmalldot:854878585205948436>**A place** on the <#806302705185325106> list.`
        )
        .setTimestamp()
        .setColor(newMember.guild.me.displayHexColor)
        .setThumbnail(
          "https://media.tenor.com/images/0b4668fdf47ac54f94aa638c1103db6f/tenor.gif"
        );
      if (!oldStatus && newStatus) {
        this.client.channels.cache.get("867123225899958325").send(boostEmbed);
      }
    } catch (err) {
      console.log(err);
    }
  }
};
