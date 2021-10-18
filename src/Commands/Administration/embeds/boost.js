const Command = require("../../../Build/Command.js");
const {
  Client,
  Message,
  MessageEmbed,
  Util,
  ReactionEmoji,
} = require("discord.js");
const { MessageButton, MessageActionRow } = require("discord-buttons");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "boosts",
      aliases: ["boosts"],
      category: "Administration",
      userPerms: ["MANAGE_GUILD"],
    });
  }

  async run(message, args) {
    let starboardChannel = message.guild.channels.cache.get("867123225899958325");

    const boostEmbed1 = new MessageEmbed()
      .setTitle(`WE HAVE NEW BOOSTER <:NitroBoostEmoji:852630438006620190>`)
      .setDescription(
        `**nichoe#6482** has just boosted the server! Thank you so much for your support ✨.\n Because of you now we are at **2** boosts (**Boost Tier: Tier 1**).\n**What are you getting as booster in Avocado Online?**\n\nHere are some of the **amazing** features:\nAwesome Server Booster role with an **exclusive colour**.\nGet way **more money** than normal in all minigames.\nCreate temporary **private voice and text channels**.\nAn hourly command to get coins **FASTER**.\n**A place** on the <#866484116370751521> list.\n**Ten** custom commands.\nAccess to our **V.I.P** channel.`
      )
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor)
      .setThumbnail(
        "https://media.tenor.com/images/0b4668fdf47ac54f94aa638c1103db6f/tenor.gif"
      );

    const boostEmbed2 = new MessageEmbed()
      .setTitle(`WE HAVE NEW BOOSTER <:NitroBoostEmoji:852630438006620190>`)
      .setDescription(
        `**julcia#0041** has just boosted the server! Thank you so much for your support ✨.\n Because of you now we are at **3** boosts (**Boost Tier: Tier 1**).\n**What are you getting as booster in Avocado Online?**\n\nHere are some of the **amazing** features:\nAwesome Server Booster role with an **exclusive colour**.\nGet way **more money** than normal in all minigames.\nCreate temporary **private voice and text channels**.\nAn hourly command to get coins **FASTER**.\n**A place** on the <#866484116370751521> list.\n**Ten** custom commands.\nAccess to our **V.I.P** channel.`
      )
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor)
      .setThumbnail(
        "https://media.tenor.com/images/0b4668fdf47ac54f94aa638c1103db6f/tenor.gif"
      );

    const boostEmbed3 = new MessageEmbed()
      .setTitle(`WE HAVE NEW BOOSTER <:NitroBoostEmoji:852630438006620190>`)
      .setDescription(
        `**Hannah#5464** has just boosted the server! Thank you so much for your support ✨.\n Because of you now we are at **4** boosts (**Boost Tier: Tier 1**).\n**What are you getting as booster in Avocado Online?**\n\nHere are some of the **amazing** features:\nAwesome Server Booster role with an **exclusive colour**.\nGet way **more money** than normal in all minigames.\nCreate temporary **private voice and text channels**.\nAn hourly command to get coins **FASTER**.\n**A place** on the <#866484116370751521> list.\n**Ten** custom commands.\nAccess to our **V.I.P** channel.`
      )
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor)
      .setThumbnail(
        "https://media.tenor.com/images/0b4668fdf47ac54f94aa638c1103db6f/tenor.gif"
      );

    starboardChannel.send(boostEmbed1);
    starboardChannel.send(boostEmbed2);
    starboardChannel.send(boostEmbed3);

  }
};
