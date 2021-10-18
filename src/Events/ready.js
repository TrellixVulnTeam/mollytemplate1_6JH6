const Event = require("../Build/Event");
const mongo = require("../Build/Mongo");
const creatingUser = require('../Schema/Functions/creatingUser');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: true,
    });
  }

  async run(client) {

    console.log(
      [
        `Logged in as ${this.client.user.tag}`,
        `Loaded ${this.client.commands.size} commands!`,
        `Loaded ${this.client.events.size} events!`,
      ].join("\n")
    );
    // await mongo().then((mongoose) => {
    //   try {
		// console.log("Correctly connected to MongoDB!");
    //   }finally {
		// mongoose.connection.close();
    //   }
    // });
    mongo.init();
    const activities = [
      // `${this.client.guilds.cache.size} servers!`,
      // `${this.client.channels.cache.size} channels!`,
      // `${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users!`
      // `command ${this.client.prefix}help`,
      // `Fatal Fury 2`
      `on Development`,
    ];

    let i = 0;
    setInterval(
      () =>
        this.client.user.setActivity(`${activities[i++ % activities.length]}`, {
          type: "WATCHING",
        }),
      15000
    );
  }
};
