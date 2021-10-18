const Command = require("../../Build/Command");
const Discord = require("discord.js");
const afkSchema = require("../../Schema/afkSchema");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "about",
      aliases: ["about"],
      description: "Check any user information as a citizen in avocado city.",
      usage: "",
      category: "Community",
      examples: ["!about", "!about @user"],
      cooldown: 10,
    });
  }

  async run(message, args) {

    let unemrole = message.guild.roles.cache.find("name", "Unemployed");
    let policerole = message.guild.roles.cache.find("name", "Police");    
    let rpRoles = ["866484807386529812", "877731176226377739"];
    const userEmbed = new Discord.MessageEmbed();

    if (message.member.roles.has(allowedRole.id)) {
      console.log(`${allowedRole.id}`);
    } else {
      console.log(`Nope, noppers, nadda.`);
    }
  }
};
