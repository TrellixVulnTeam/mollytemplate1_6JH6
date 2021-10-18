const Command = require("../../Build/Command.js");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "clear",
      aliases: ["clear"],
      description: "Clear as many messages as you want.",
      usage: "[50]",
      category: "Administration",
      examples: ["!clear 50"],
      userPerms: ["MANAGE_GUILD"],
    });
  }

  async run(message, args) {
    const number = args.join(" ");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      const no = new MessageEmbed()
        .setTitle("Error!")
        .setDescription(
          `<:error:841501146529923083> You dont have any permissions to execute this command!`
        )
        .setColor("RED");
      message.channel.send(no).then((sent) => sent.delete({ timeout: 10000 }));
    } else {
      if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        const naw = new MessageEmbed()
          .setTitle("Error!")
          .setDescription(
            `<:error:841501146529923083> I can not clear this chat without the \`Manage Messages\` permission!`
          )
          .setColor("RED");
        message.channel
          .send(naw)
          .then((sent) => sent.delete({ timeout: 10000 }));
      } else {
        if (!number) {
          const naw = new MessageEmbed()
            .setTitle("Error!")
            .setDescription(
              `<:error:841501146529923083> Please enter a number!`
            )
            .setColor("RED");
          message.channel
            .send(naw)
            .then((sent) => sent.delete({ timeout: 10000 }));
        } else {
          if (isNaN(number)) {
            const notanumber = new MessageEmbed()
              .setTitle("Error!")
              .setDescription(
                `<:error:841501146529923083> This is not a valid number!`
              )
              .setColor(message.guild.me.displayHexColor);
            message.channel
              .send(notanumber)
              .then((sent) => sent.delete({ timeout: 10000 }));
          } else {
            if (number > 100) {
              const ripchatlmao = new MessageEmbed()
                .setTitle("Error!")
                .setDescription(
                  `<:error:841501146529923083> Please enter a number from 1 - 100!`
                )
                .setColor(message.guild.me.displayHexColor);
              message.channel
                .send(ripchatlmao)
                .then((sent) => sent.delete({ timeout: 10000 }));
            } else {
              if (number < 1) {
                const megobruhnow = new MessageEmbed()
                  .setTitle("Error!")
                  .setDescription(
                    `<:error:841501146529923083> Please enter a number higher than 0!`
                  )
                  .setColor(message.guild.me.displayHexColor);
                message.channel
                  .send(megobruhnow)
                  .then((sent) => sent.delete({ timeout: 10000 }));
              } else {
                const awaits = await message.channel.bulkDelete(number);
                const done = new MessageEmbed()
                  .setTitle("Success!")
                  .setDescription(
                    `<a:success:841499815841366016> Deleted ${awaits.size} messages in from this channel!`
                  )
                  .setFooter(
                    `Command applied by ${message.author.username}`,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
                  .setColor(message.guild.me.displayHexColor);
                message.channel
                  .send(done)
                  .then((sent) => sent.delete({ timeout: 10000 }));
              }
            }
          }
        }
      }
    }
  }
};
