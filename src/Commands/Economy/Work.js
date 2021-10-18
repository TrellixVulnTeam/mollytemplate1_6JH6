const Command = require("../../Build/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
        name: "work",
        aliases: ["work"],
        description: "Work your ass off.",
        usage: "@user",
        category: "Economy",
        examples: ["!balance", "!balance @Molly"],
        cooldown: 5    
    });
  }

  async run(message, args) {
    message.channel.send("This is just a command test");
  }
};
