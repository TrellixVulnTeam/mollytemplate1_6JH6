const { Message, MessageEmbed, Permissions } = require("discord.js");
const { prefix } = require("../../Configuration/config.json");

module.exports = (client) => {
  client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.channel.type === "dm") return;
    if (reaction.message.partial) await reaction.message.fetch(true);
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.author.bot || user.bot) return;

    let starboardChannel =
      reaction.message.guild.channels.cache.get("866484116370751524");
    let starboardFetch = await starboardChannel.fetch({ limit: 100 });

    let exist = starboardFetch.messages.cache.find(
      (m) =>
        m.embeds.length >= 1 &&
        m.embeds[0].title === "Starboard" &&
        m.embeds[0].fields[0].value.match(reaction.message.id)
    );

    if (exist) return;

    if (reaction.message.guild.id === "866484116106117141") {
      if (reaction.emoji.name === "⭐") {
        let count = reaction.users.cache
          .filter((x) => reaction.message.author.id !== x.id && !x.bot)
          .array().length;
        if (count >= 4) {
          const embed = new MessageEmbed()
            .setTitle(`from: ${reaction.message.author.tag}`)
            .setColor("#589458")
            .setThumbnail(
              reaction.message.author.displayAvatarURL({ dynamic: true })
            )
            .setDescription(
              reaction.message.content.length <= 0
                ? ""
                : reaction.message.content
            )
            .addField(
              "Original",
              `[Jump to Message](https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id})`
            );
          if (reaction.message.attachments.array().length >= 1)
            embed.setImage(reaction.message.attachments.array()[0].proxyURL);
          starboardChannel.send(embed);
        }
      }
    }
  });
};
