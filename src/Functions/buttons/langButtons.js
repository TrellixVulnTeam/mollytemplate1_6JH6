const { Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = (client) => {
  client.on("clickButton", async (button) => {
    if (button.id == "esroleButton") {
      const roleES = button.guild.roles.cache.get("868322268013555722");
      const member = button.clicker.member;
      await member.roles.add(roleES);
      button.reply.send(
        `You have successfully unlocked the role <@&868322268013555722>!`,
        true
      );
    }
    if (button.id == "enroleButton") {
      const roleEN = button.guild.roles.cache.get("868322300771053568");
      const member = button.clicker.member;
      await member.roles.add(roleEN);
      button.reply.send(
        `You have successfully unlocked the role <@&868322300771053568>!`,
        true
      );
    }
    if (button.id == "plroleButton") {
      const rolePL = button.guild.roles.cache.get("868322339098591282");
      const member = button.clicker.member;
      await member.roles.add(rolePL);
      button.reply.send(
        `You have successfully unlocked the role <@&868322339098591282>!`,
        true
      );
    }
    if (button.id == "verificationButton") {
      const embedWelcome = new MessageEmbed()
      .setTitle('Hello!')
      .setColor("#589458")
      .setThumbnail('https://media.discordapp.net/attachments/849077539628384256/874456579968204820/thumbnail-discord.png')
      .setDescription('Thank you for joining Avocado Online, for being one of the first people you will have the **Golden Avocado** badge. If you are still wondering what the server is about, in short, it is a place where you can talk and share on any topic, and in addition to this we also have our roleplaying channels where you can play at any time, although for now it is not finished, we would love to have you help us test the functions and find bugs. ')
      .setFooter(' with love, molly.')
      const role1 = button.guild.roles.cache.get("866484116106117145");
      const role2 = button.guild.roles.cache.get("867194316161941544");
      const roled = button.guild.roles.cache.get("866484116106117143");
      const member = button.clicker.member;
      await member.roles.add(role1);
      await member.roles.add(role2);
      await member.roles.remove(roled);
      member.send(embedWelcome)
      button.reply.send(
        "You have successfully joined Avocado Online, have fun!",
        true
      );

    }
  });
};
