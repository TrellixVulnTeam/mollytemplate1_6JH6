const { Message, MessageEmbed, Permissions } = require("discord.js");
const { prefix } = require("../../Configuration/config.json");
const talkedRecently = new Set();

module.exports = (client) => {
  client.on("message", async (message) => {
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    if (message.author.bot) return false;
    if (!args.length) {
      return;
    }

    if (message.channel.type == "dm") {
      if (talkedRecently.has(message.author.id)) {
        message.reply("Wait 5 minute before sending a confession again. 😄");
      } else {
        if (command === "confess") {
          const privateEmbed = new MessageEmbed()
            .setTitle("**New Confession**")
            .setDescription(
              `Remember to delete a confession if you find **offensive content**.`
            )
            .setColor("#589458")
            .addFields(
              {
                name: "User Nickname",
                value: `${message.author.username}`,
                inline: false,
              },
              {
                name: "Message",
                value: `${args.join(" ")}`,
                inline: false,
              }
            )
            .setTimestamp();
          client.channels.cache.get("868004432967778365").send(privateEmbed);
          const embed = new MessageEmbed()
            .setColor("#589458")
            .setTitle("💌 Anonymous Confession")
            .setDescription(`> ${args.join(" ")}`)
            .setTimestamp();
          client.channels.cache.get("866484116370751520").send(embed);
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 300000);
      }
    }
  });
};
