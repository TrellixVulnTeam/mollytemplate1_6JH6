const Command = require("../../Build/Command.js");
const Discord = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["lastinvite"],
      category: "Administration",
      userPerms: ["MANAGE_GUILD"],
    });
  }

  async run(message, args) {
    message.guild.members.cache.forEach(member => {
        const embed = new Discord.MessageEmbed()
        .setDescription(`Hey, have you already joined our new server?\neveryone is currently moving into: https://discord.gg/bfQVd6Qr2V\nwe're waiting for you!`)
        .setThumbnail('https://media.discordapp.net/attachments/841197221578801172/873812743877169202/thumbnail-discord.png')
        .setColor('#589458')
        .setFooter('- Molly')
        if (member.id != this.client.user.id && !member.user.bot)
        member.send(embed)
    })
  }
}