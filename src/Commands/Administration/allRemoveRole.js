const Command = require("../../Build/Command.js");
const Discord = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["removeroles"],
      category: "Administration",
      userPerms: ["MANAGE_GUILD"]
    });
  }

  async run(message, args) {
    // message.delete();
    // let role = message.guild.roles.cache.find(r => r.name == 'Newbie');
    // if (!role) return message.channel.send(`**${message.author.username}**, role not found`);
    // message.guild.members.cache.forEach(member => member.roles.remove(role))
    // message.channel.send(`**${message.author.username}**, role **${role.name}** was remove from everyone`);
  }
};
