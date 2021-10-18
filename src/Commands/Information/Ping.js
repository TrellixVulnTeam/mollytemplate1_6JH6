const Command = require("../../Build/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "ping",
      aliases: ["latency"],
      description: "Check's Pogy's latency",
      category: "Information",
      cooldown: 5,
    });
  }

  async run(message) {
    message.channel.send("🏓 Pong!").then((m) => {
      m.edit(
        `📨 Ping Mensajes: \`${Math.floor(m.createdTimestamp - Date.now())} ms\`
          🛰️ Ping DiscordAPI: \`${this.client.ws.ping} ms\``
      );
    });
  }
};
