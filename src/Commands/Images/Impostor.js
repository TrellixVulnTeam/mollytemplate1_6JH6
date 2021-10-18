const Command = require("../../Build/Command");
const fetch = require("node-fetch");
const discord = require("discord.js");
const request = require("request-promise-native");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "impostor",
      aliases: ["impostor"],
      description: "Mention anyone to make them the imposter",
      category: "Image",
      usage: "<text>",
      examples: ["!impostor Molly"],
      cooldown: 5,
    });
  }

  async run(message, args) {
    try {
      let text = args.slice(0).join(" ");
      if (!text)
        return message.channel.send(
          new discord.MessageEmbed()
            .setColor(client.color.red)
            .setDescription('Error')
        );
      if (text.length > 40)
        return message.channel.send(
          new discord.MessageEmbed()
            .setColor(client.color.red)
            .setDescription('Error')
        );
      //https://vacefron.nl/api/ejected?name=[MESSAGE]&imposter=true&crewmate=red
      let options = {
        url: "https://vacefron.nl/api/ejected",
        qs: {
          name: args.join(" ").split("").join(""),
          imposter: true,
          crewmate: "darkgreen",
        },
        encoding: null,
      };

      let response = await request(options);

      await message.channel.send({
        files: [response],
      });
    } catch (error) {
      this.client.emit("apiError", error, message);
    }
  }
};
