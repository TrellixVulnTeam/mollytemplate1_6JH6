const Command = require("../../../Build/Command.js");
const Discord = require("discord.js");
const itemTools = require("../../../Data/Shop/itemTools");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "shopt",
      aliases: ["shopt"],
      usage: "",
      description: "You can check everything that is for sale",
      category: "Economy",
      examples: ["!shop"],
      cooldown: 5,
    });
  }

  async run(message, args) {
    const errorEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
    const successEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    if (!args[0]) {
      return message.channel.send(
        successEmbed
          .setTitle("Avocado Online Shop")
          .setDescription(
            "Welcome to the Avocado Online shop, please type below !shop and the category you want to use."
          )
          .addFields(
            { name: "Tools:", value: "``!shop tools``", inline: true },
            { name: "Food:", value: "``!shop food``", inline: true },
            { name: "VIP:", value: "``!shop vip``", inline: true },
            { name: "Casino:", value: "``!shop casino``", inline: true },
            { name: "Boosters:", value: "``!shop boosters``", inline: true },
            { name: "Others:", value: "``!shop others``", inline: true }
          )
      );
    }

    const toolName = itemTools.map((e) => `${e.item}`).join("\n");
    const toolPrice = itemTools.map((e) => `${e.price}`).join("\n");
    const toolDur = itemTools.map((e) => `${e.durability}`).join("\n");

    if (args[0] == "tools") {
      return message.channel.send(
        successEmbed
          .setTitle("Tools Section")
          .setDescription(
            "Each tool allows you to complete\nimportant tasks on Avocado City."
          )
          .addFields(
            { name: "Name", value: `**${toolName}**`, inline: true },
            { name: "Price", value: `${toolPrice}`, inline: true },
            { name: "Durability", value: `${toolDur}`, inline: true }
          )
      );
    } else {
      message.reply(`Couldn't find this section, please try again.`);
    }
  }
};
