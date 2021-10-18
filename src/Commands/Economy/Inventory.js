const Command = require("../../Build/Command");
const Discord = require("discord.js");
const inventorySchema = require("../../Schema/inventorySchema");
const mongoose = require("mongoose");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "inventory",
      aliases: ["inventory"],
      description: "Show all your items.",
      category: "Economy",
      examples: ["!inventory"],
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

    const params = {
      guildID: message.guild.id,
      userID: message.author.id,
    };

    inventorySchema.findOne(
      { guildID: message.guild.id, userID: mentionedMember.id },
      async (err, data) => {
        if (!data)
          return message.channel.send(
            successEmbed
              .setTitle(`${mentionedMember.user.username}'s Inventory`)
              .setDescription("Your inventory is empty!")
          );
        const mappedData = Object.keys(data.inventory)
          .map((key) => {
            return `${key} (${data.inventory[key]})`;
          })
          .join("\n");

        message.channel.send(
          successEmbed
            .setTitle(`${mentionedMember.user.username}'s Inventory`)
            .addField("Items", `${capitalize(mappedData)}`, false)
        );
      }
    );
  }
};

function capitalize(string) {
  return string
    .split(/\n/g)
    .map((x) => x.charAt(0).toUpperCase() + x.substr(1))
    .join("\n");
}
