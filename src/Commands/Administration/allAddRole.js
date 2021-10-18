const Command = require("../../Build/Command.js");
const Discord = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["addroles"],
      category: "Administration",
      userPerms: ["MANAGE_GUILD"]
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    // let role = message.guild.roles.cache.find((r) => r.name == "Brand New");
    // message.guild.members.cache.forEach(member => member.roles.add(role))
  }
}