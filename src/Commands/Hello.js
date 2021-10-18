const Command = require("../Build/Command.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["hey"],
      cooldown: 20,
      category: "Administration",
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    message.channel.send("Hello!");
  }
};
