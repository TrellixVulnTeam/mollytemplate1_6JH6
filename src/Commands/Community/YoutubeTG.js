const Command = require("../../Build/Command");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const config = require("../../Configuration/config.json");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "youtubetogether",
      aliases: ["ytt"],
      description: "open a youtube window inside a voicechat",
      usage: "",
      category: "Community",
      examples: ["!ytt"],
      cooldown: 5,
    });
  }
  async run(message, args) {
    const member = message.member;
    const channel = message.member.voice.channel;
    if (!channel)
      return message.reply(
        "You need to be in a voicechat to use this command!"
      );
    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
      method: "POST",
      body: JSON.stringify({
        max_age: 86400,
        max_uses: 0,
        target_application_id: "755600276941176913",
        target_type: 2,
        temporary: false,
        validate: null,
      }),
      headers: {
        Authorization: `Bot ${config.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((invite) => {
        if (!invite.code)
          return message.reply("Sorry, can't start this application");

        message.channel.send(
          `[Click me to join](https://discord.com/invite/${invite.code})`
        );
      });
  }
};
