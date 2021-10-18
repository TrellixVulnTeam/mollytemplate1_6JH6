const { MessageEmbed } = require("discord.js");
const Command = require("../../../../Build/Command");
const programmerquiz = require("../../../../Data/Temp/programmer.json");
const chefreactions = require("../../../../Data/Temp/chezreactions.json");
const currencySchema = require("../../../../Schema/currencySchema");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "tempjob",
      aliases: ["tempjob"],
      description: "Pick a temporary job and earn fast money.",
      usage: "",
      category: "Roleplay",
      examples: ["!tempjob"],
      cooldown: 0,
    });
  }

  async run(message, args) {
    var jobs = ["Chef", "Programmer"];

    var jobIndex = Math.floor(Math.random() * jobs.length);
    const normalCoins = Math.floor(Math.random() * 200) + 1;
    const boostedCoins = Math.floor(Math.random() * 900) + 1;
    if (
      message.member.roles.cache.has("866484116106117149") ||
      message.member.roles.cache.has("873295356627152898")
    ) {
      if (jobs[jobIndex] === "Programmer") {
        const item =
          programmerquiz[Math.floor(Math.random() * programmerquiz.length)];
        const embed1 = new MessageEmbed()
          .setTitle(item.question)
          .setColor(message.guild.me.displayHexColor)
          .setFooter(
            "reply to this message with true or false, you have only 10 seconds!"
          );
        message.channel.send(`You got a temporary job as programmer!`, {
          embed: embed1,
        });
        try {
          let msgs = await message.channel.awaitMessages(
            (u2) => u2.author.id === message.author.id,
            { time: 15000, max: 1, errors: ["time"] }
          );
          if (msgs.first().content == item.answer) {
            await currencySchema
              .updateOne(
                { userID: message.author.id },
                { $inc: { cash: boostedCoins } }
              )
              .catch((err) => console.log(err));
            return message.reply(
              `Congratulations! You got the correct answer. Money earned **${boostedCoins}**`
            );
          } else {
            return message.reply(
              `Sorry, that answer is incorrect, better luck next time!`
            );
          }
        } catch (e) {
          return message.reply(
            `${message.author.username} you did not answer at time, better luck next time!`
          );
        }
      } else if (jobs[jobIndex] === "Chef") {
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
              await currencySchema
                .updateOne(
                  { userID: message.author.id },
                  { $inc: { cash: boostedCoins } }
                )
                .catch((err) => console.log(err));
              return message.reply(
                `Congratulations! You got the correct answer. You've earned **${boostedCoins}**`
              );
            } else {
              return message.reply(
                `Sorry, that answer is incorrect, better luck next time!`
              );
            }
          })
          .catch(() => {
            return message.reply(
              `You did not answer at time, better luck next time!`
            );
          });
      }
    } else {
      if (jobs[jobIndex] === "Programmer") {
        const item =
          programmerquiz[Math.floor(Math.random() * programmerquiz.length)];
        const embed1 = new MessageEmbed()
          .setTitle(item.question)
          .setColor(message.guild.me.displayHexColor)
          .setFooter(
            "reply to this message with true or false, you have only 10 seconds!"
          );
        message.channel.send(`You got a temporary job as programmer!`, {
          embed: embed1,
        });
        try {
          let msgs = await message.channel.awaitMessages(
            (u2) => u2.author.id === message.author.id,
            { time: 15000, max: 1, errors: ["time"] }
          );
          if (msgs.first().content == item.answer) {
            await currencySchema
              .updateOne(
                { userID: message.author.id },
                { $inc: { cash: normalCoins } }
              )
              .catch((err) => console.log(err));
            return message.reply(
              `Congratulations! You got the correct answer. You've earned **${normalCoins}**`
            );
          } else {
            return message.reply(
              `Sorry, that answer is incorrect, better luck next time!`
            );
          }
        } catch (e) {
          return message.reply(
            `You did not answer at time, better luck next time!`
          );
        }
      } else if (jobs[jobIndex] === "Chef") {
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
              await currencySchema
                .updateOne(
                  { userID: message.author.id },
                  { $inc: { cash: normalCoins } }
                )
                .catch((err) => console.log(err));
              return message.reply(
                `Congratulations! You got the correct answer. You've earned **${normalCoins}**`
              );
            } else {
              return message.reply(
                `Sorry, that answer is incorrect, better luck next time!`
              );
            }
          })
          .catch(() => {
            return message.reply(
              `You did not answer at time, better luck next time!`
            );
          });
      }
    }
  }
};
