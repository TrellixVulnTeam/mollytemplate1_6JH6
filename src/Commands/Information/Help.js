const Command = require("../../Build/Command.js");
const { MessageEmbed } = require("discord.js");
const uEmojis = require("../../Assets/Emojis/utiliy_emojis.json");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "help",
      aliases: ["help"],
      description: "Display and get help on using all the commands.",
      usage: "[command]",
      category: "Information",
      examples: ["!help userinfo", "!help avatar"],
      cooldown: 3,
    });
  }

  async run(message, args) {
    const emoji = {
      information: `${uEmojis.information}`,
      general: `${uEmojis.general}`,
      community: `${uEmojis.community}`,
      fun: `${uEmojis.fun}`,
      image: `${uEmojis.image}`,
      economy: `${uEmojis.economy}`
    };

    let enabled = "<:enabled:860970492101787648>";
    let disabled = "<:disabled:860970492126429204>";

    const embed = new MessageEmbed().setColor(message.guild.me.displayHexColor);

    if (!args || args.length < 1) {
      let categories;
      categories = this.client.utils.removeDuplicates(
        this.client.commands
          .filter((cmd) => cmd.category !== "Administration")
          .map((cmd) => cmd.category)
      );

      for (const category of categories) {
        embed.addField(
          `${emoji[category.split(" ").join("").toLowerCase()]} **${capitalize(
            category
          )}**`,
          `\`${this.client.prefix}help ${category.toLowerCase()}\``,
          true
        );
      }
      embed.setTitle(`${message.guild.name} Help Menu`);
      embed.setDescription(`
    The prefix for this server is \`${this.client.prefix}\`
    `);

      embed.setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setTimestamp();

      return message.channel.send(embed);
    } else if (args && args[0].toLowerCase() == "administration") {
      if (
        !message.member.roles.cache.find((r) => r.name === "Administrator") ||
        message.member.roles.cache.find((r) => r.name === "Moderator") ||
        message.member.roles.cache.find((r) => r.name === "Warden")
      ) {
        return message.channel.send(
          ` You are not allowed to view this category`
        );
      }

      embed.setTitle(`Administration Commands`);
      embed.setDescription(
        this.client.commands
          .filter((cmd) => cmd.category.toLowerCase() === "administration")
          .map(
            (cmd) =>
              `\`${cmd.name} ${" ".repeat(11 - Number(cmd.name.length))}:\` ${
                cmd.description
              }`
          )
          .join("\n")
      );

      embed.setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setTimestamp();
      return message.channel.send(embed);
    } else if (
      (args && args[0].toLowerCase() == "general") ||
      (args && args[0].toLowerCase() == "gen")
    ) {
      embed.setTitle(`General Commands`);
      embed.setDescription(
        this.client.commands
          .filter((cmd) => cmd.category.toLowerCase() === "general")
          .map(
            (cmd) =>
              `${cmd.disabled ? disabled : enabled}\`${cmd.name} ${" ".repeat(11 - Number(cmd.name.length))}:\` ${
                cmd.description
              }`
          )
          .join("\n")
      );

      embed.setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setTimestamp();

      return message.channel.send(embed);
    } else if (
      (args && args[0].toLowerCase() == "config") ||
      (args && args[0].toLowerCase() == "configuration")
    ) {
      embed.setTitle(` ${s.config} - Config`);
      embed.setDescription(
        this.client.commands
          .filter((cmd) => cmd.category.toLowerCase() === "config")
          .map(
            (cmd) =>
              `${cmd.disabled ? disabled : enabled}\`${cmd.name} ${" ".repeat(11 - Number(cmd.name.length))}:\` ${
                cmd.description
              }`
          )
          .join("\n")
      );

      embed.setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setTimestamp();
      return message.channel.send(embed);
    } else if (
      (args && args[0].toLowerCase() == "information") ||
      (args && args[0].toLowerCase() == "info")
    ) {
      embed.setTitle(`Information`);
      embed.setDescription(
        this.client.commands
          .filter((cmd) => cmd.category.toLowerCase() === "information")
          .map(
            (cmd) =>
              `${cmd.disabled ? disabled : enabled}\`${cmd.name} ${" ".repeat(11 - Number(cmd.name.length))}:\` ${
                cmd.description
              }`
          )
          .join("\n")
      );

      embed.setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setTimestamp();
      return message.channel.send(embed);
    } else if (args && args[0].toLowerCase() == "community") {
      embed.setTitle(`Community Commands`);
      embed.setDescription(
        this.client.commands
          .filter((cmd) => cmd.category.toLowerCase() === "community")
          .map(
            (cmd) =>
              `${cmd.disabled ? disabled : enabled}\`${cmd.name} ${" ".repeat(11 - Number(cmd.name.length))}:\` ${
                cmd.description
              }`
          )
          .join("\n")
      );

      embed.setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setTimestamp();

      return message.channel.send(embed);
    } else if (args && args[0].toLowerCase() == "fun") {
      embed.setTitle(`Fun Commands`);
      embed.setDescription(
        this.client.commands
          .filter((cmd) => cmd.category.toLowerCase() === "fun")
          .map(
            (cmd) =>
              `${cmd.disabled ? disabled : enabled}\`${cmd.name} ${" ".repeat(11 - Number(cmd.name.length))}:\` ${
                cmd.description
              }`
          )
          .join("\n")
      );

      embed.setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setTimestamp();

      return message.channel.send(embed);
    } else if (args && args[0].toLowerCase() == "image") {
      embed.setTitle(`Image Manipulation Commands`);
      embed.setDescription(
        this.client.commands
          .filter((cmd) => cmd.category.toLowerCase() === "image")
          .map(
            (cmd) =>
              `${cmd.disabled ? disabled : enabled}\`${cmd.name} ${" ".repeat(11 - Number(cmd.name.length))}:\` ${
                cmd.description
              }`
          )
          .join("\n")
      );

      embed.setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setTimestamp();

      return message.channel.send(embed);
    } else if (args && args[0].toLowerCase() == "economy") {
      embed.setTitle(`Economy Commands`);
      embed.setDescription(
        this.client.commands
          .filter((cmd) => cmd.category.toLowerCase() === "economy")
          .map(
            (cmd) =>
              `${cmd.disabled ? disabled : enabled}\`${cmd.name} ${" ".repeat(11 - Number(cmd.name.length))}:\` ${
                cmd.description
              }`
          )
          .join("\n")
      );

      embed.setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setTimestamp();

      return message.channel.send(embed);
    } else {
      const cmd =
        this.client.commands.get(args[0]) ||
        this.client.commands.get(this.client.aliases.get(args[0]));

      if (!cmd)
        return message.channel.send(
          `Could not find the Command you're looking for`
        );

      if (cmd.category === "administration")
        return message.channel.send(
          `Could not find the command you're looking for`
        );

      embed.setTitle(`Command: ${cmd.name}`);
      embed.setDescription(cmd.description);
      embed.addField("Usage", `\`${cmd.usage}\``, true);
      embed.addField("Category", `\`${cmd.category}\``, true);

      if (cmd.aliases && cmd.aliases.length && typeof cmd.aliases === "array")
        embed.addField(
          "Aliases",
          cmd.aliases.map((alias) => `\`${alias}\``, true).join(", "),
          true
        );
      if (cmd.cooldown && cmd.cooldown > 1)
        embed.addField("Cooldown", `\`${cmd.cooldown}s\``, true);
      if (cmd.examples && cmd.examples.length)
        embed.addField(
          "__**Examples**__",
          cmd.examples.map((example) => `\`${example}\``).join("\n")
        );

      return message.channel.send(embed);
    }
  }
};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
