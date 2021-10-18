const { MessageEmbed } = require("discord.js");
const Command = require("../../../../Build/Command");
const chefreactions = require("../../../../Data/Temp/chezreactions.json");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "temp",
      aliases: ["temp"],
      description: "Pick a temporary job and earn fast money.",
      usage: "",
      category: "Roleplay",
      examples: ["!tempjob"],
      cooldown: 0,
    });
  }

  async run(message, user) {
    let i = 0;
    const chefTask =
      chefreactions[Math.floor(Math.random() * chefreactions.length)];
    const embedChef = new MessageEmbed()
      .setTitle(chefTask.question)
      .setColor(message.guild.me.displayHexColor)
      .setFooter(
        "react with the correct answer, they're waiting for the order! you have only 15 seconds."
      );
    let msg = await message.channel.send(
      "You just a temporary job in the local restaurant! 👨‍🍳",
      {
        embed: embedChef,
      }
    );
    chefTask.ingredients.map(async (opt) => {
      i++;
      await msg.react(`${opt}`);
    });
    msg
      .awaitReactions((reaction, user) => user.id == message.author.id, {
        max: 1,
        time: 15000,
        errors: ["time"],
      })
      .then(async (collected) => {
        if (collected.first().emoji.name == `${chefTask.answer}`) {
          await message.channel.send("You've chosen the right answer");
        } else {
          await message.channel.send("You've chosen the wrong answer");
        }
      })
      .catch(() => {
        message.reply("you didn't react at time, good luck next time.");
      });
  }
};
