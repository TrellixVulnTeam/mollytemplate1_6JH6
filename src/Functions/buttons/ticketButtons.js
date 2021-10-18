const { Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = (client) => {
  client.on("clickButton", async (button) => {
    const member = button.clicker.member;
    if (button.id == "generalButton") {
      const channelTicket = await button.guild.channels.create(
        `general-ticket-${button.clicker.user.discriminator}`
      );
      channelTicket.setParent("867273282067496990");
      await channelTicket.overwritePermissions([
        {
          type: "admin",
          id: "866484116119617558",
          allow: [Permissions.FLAGS.VIEW_CHANNEL],
          deny: [Permissions.FLAGS.CREATE_INSTANT_INVITE],
        },
        {
          type: "mod",
          id: "866484116119617557",
          allow: [Permissions.FLAGS.VIEW_CHANNEL],
          deny: [Permissions.FLAGS.CREATE_INSTANT_INVITE],
        },
        {
          type: "warden",
          id: "866484116119617556",
          allow: [Permissions.FLAGS.VIEW_CHANNEL],
          deny: [Permissions.FLAGS.CREATE_INSTANT_INVITE],
        },
        {
          type: "user",
          id: button.clicker.user.id,
          allow: [Permissions.FLAGS.VIEW_CHANNEL],
          deny: [Permissions.FLAGS.CREATE_INSTANT_INVITE],
        },
        {
          type: "everyone",
          id: "867194316161941544",
          deny: [Permissions.FLAGS.VIEW_CHANNEL],
        },
      ]);
      var channelOut = button.guild.channels.cache.get("867476169480863785");
      const privateEmbed = new MessageEmbed()
        .setTitle("**New Ticket Incoming**")
        .setDescription(
          `We require the help of the staff the soon as possible.`
        )
        .setColor(button.guild.me.displayHexColor)
        .addFields(
          { name: "User", value: `${button.clicker.user.tag}`, inline: true },
          {
            name: "Channel Name",
            value: `**${channelTicket.name}**`,
            inline: true,
          },
          { name: "Reason", value: "General", inline: true }
        )
        .setTimestamp();
      channelOut.send(privateEmbed);
      button.reply.send(
        "**Ticket Created**\nThanks for contacting the support, we will be at you in a moment, please stand by.",
        true
      );
    }

    if (button.id == "citizenButton") {
      const member = button.clicker.member;
      if(!member.bot){
        if (member.roles.cache.some((role) => role.name === "Newbie")) {
          const roleCitizen = button.guild.roles.cache.get("866484116106117144");
          const roleUnem = button.guild.roles.cache.get("866484807386529812");
          await member.roles.add(roleCitizen);
          await member.roles.add(roleUnem);
          button.reply.send(
            "You have successfully become an official Avocado Citizen, congratulations!",
            true
          );
        } else {
          const Newbie = button.guild.roles.cache.find(
            (role) => role.name == "Newbie"
          );
          button.reply.send(
            `Sorry, you don't have the role ${Newbie}.\nPlease keep talking to level up!`,
            true
          );
        }
      }
    }
  });
};
