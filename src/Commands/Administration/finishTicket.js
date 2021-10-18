const Command = require("../../Build/Command");
const Discord = require("discord.js");
const ticketTranscript = require("../../Schema/transcriptSchema");
const fs = require("fs");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "finishticket",
      aliases: ["finishticket"],
      description:
        "Destroys a ticket and saves the full chat in a text editor.",
      category: "Administration",
      cooldown: 5,
      userPerms: ["MANAGE_GUILD"],
    });
  }

  async run(message, args) {
    const transcriptChannel =
    message.guild.channels.cache.get("867495469102006272");
    message.channel.send("Deleting ticket in 5 seconds...");
    setTimeout(() => {
      message.channel.delete().then(async (ch) => {
        await ticketTranscript.findOne(
          { channel: ch.id },
          async (err, data) => {
            if (err) throw err;
            if (data) {
              fs.writeFileSync(`../${ch.id}.txt`, data.content.join("\n\n"));
              transcriptChannel.send(
                `A new ticket have been closed.`
              );
              await transcriptChannel.send(
                new Discord.MessageAttachment(
                  fs.createReadStream(`../${ch.id}.txt`)
                )
              );
              await ticketTranscript.findOneAndDelete({ channel: ch.id });
            }
          }
        );
      });
    }, 5000);
  }
};
