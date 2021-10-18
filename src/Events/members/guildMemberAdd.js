const Event = require("../../Build/Event");
const Discord = require("discord.js");
let currencySchema = require("../../Schema/currencySchema");
let userSchema = require("../../Schema/userSchema");

module.exports = class extends Event {
  async run(member) {
    try {
      let newUserProfile = await userSchema.findOne({
        guildID: member.guild.id,
        userID: member.id,
      });
      if (!newUserProfile) {
        newUserProfile = await new userSchema({
          guildID: member.guild.id,
          userID: member.id,
          userNicknTag: member.user.tag,
        });

        await newUserProfile.save().catch((err) => console.log(err));
      }

      let newUserCurrency = await currencySchema.findOne({
        guildID: member.guild.id,
        userID: member.id,
      });
      if (!newUserCurrency) {
        newUserCurrency = await new currencySchema({
          guildID: member.guild.id,
          userID: member.id,
          cash: 500,
          lastedEdited: Date.now(),
        });
        await newUserCurrency.save().catch((err) => console.log(err));
      }

      var role = member.guild.roles.cache.find(
        (role) => role.name === "Unconfirmed Member"
      );
      member.roles.add(role);

      const channel = member.guild.channels.cache.find((channel) =>
        channel.name.includes("👋・join-and-leave")
      );
      if (!channel) return;

      //send through channel
      const welcome = {
        color: member.guild.me.displayHexColor,
        title: `**WELCOME TO THE SERVER, ${member.user.tag} 🎉!!**`,
        description: `Hello ${member.user.tag}, we appreciate you stopping by and checking out our awesome server ${member.guild.name}!\n
We have great plans and we're so excited that you're here to experience all the functions of our bot, also remember to have fun in every channels!🎊`,
        thumbnail: {
          url: member.user.avatarURL(),
        },
        fields: [
          {
            name: "Information",
            value: `Make sure to read the channel of <#722995536583721022> for a complete tour of the server, also check the channel <#722995067236646932> for the statutes and FAQs.
        `,
            inline: false,
          },
          {
            name: "Need Help?",
            value:
              "Always use the !help command, or ask any of our staff members. Remember than you can also open a ticket in <#867273554512969800> to get any type of help.",
            inline: false,
          },
          {
            name: "How to Start?",
            value: `Check the channel <#741841483405066322> and became a Legal Citizen and try all the roleplaying features Avocado City!`,
            inline: false,
          },
        ],
        timestamp: new Date(),
      };
      channel.send({ embed: welcome }).then(function (message) {
        message.react("🎉");
      });
    } catch (err) {
      console.log(err);
    }
  }
};
