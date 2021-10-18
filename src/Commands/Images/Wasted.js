const Command = require("../../Build/Command");
const Discord = require("discord.js");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient("920b64b33bba2c28dc86da96460392b3da36ce328846607ae5ff1b0d0d5b23fe924039c9ee9fa08f058ef6e4c53d8eefd341f18b1d44b6fafe0c34729cc1762f");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["wasted"],
      category: "Image",
      description: "get rekt"
    });
  }

  async run(message, args) {
    const successEmbed = new Discord.MessageEmbed()
    .setColor(message.guild.me.displayHexColor)
    .setFooter(
      `Requested by ${message.author.tag}`,
      message.author.displayAvatarURL({ dynamic: true })
    )
    .setTimestamp();
    try {
        const User = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;

        const wait = await message.reply({
         embed: {
          color: message.guild.me.displayHexColor,
          description: "✨ Please wait... I'm generating your image",
         },
        });


        const buffer = await AmeAPI.generate("wasted", {
            url: User.user.displayAvatarURL({
                format: "png",
                size: 2048,
            }),
        });
        wait.delete();
        const attachment = new Discord.MessageAttachment(buffer, "wasted.png");
        message.channel.send(attachment);
       } catch (err) {
        console.log(err);
        message.lineReply({
         embed: {
          color: "RED",
          description: "Something went wrong... :cry:",
         },
        });
       }
  }
};
