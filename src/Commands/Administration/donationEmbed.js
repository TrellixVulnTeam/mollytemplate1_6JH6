const Command = require("../../Build/Command.js");
const Discord = require("discord.js");
const {
  MessageMenuOption,
  MessageMenu,
  MessageActionRow,
} = require("discord-buttons");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["donation"],
      category: "Administration",
      userPerms: ["MANAGE_GUILD"],
    });
  }

  async run(message, args) {
    message.delete();
    // First Option In Menu
    const Role1 = new MessageMenuOption()
      .setLabel("Paypal") // Label
      .setDescription("Send money securely for free.") // Description, Limit Is 50
      .setEmoji("867195594551853066") // Emoji ID
      .setValue("paypal") // To Make Its Funtion When Use Click It

    // Second Option In Menu
    const Role2 = new MessageMenuOption()
      .setLabel("buymeacoffee") // Label
      .setDescription("Tips and donations to support our work.") // Description, Limit Is 50
      .setEmoji("866865684247740426") // Emoji ID
      .setValue("buycoffee") // To Make Its Funtion When Use Click It

    // Third Option In Menu
    const Role3 = new MessageMenuOption()
      .setLabel("Ko-fi") // Label
      .setDescription("Friendly way to accept donations.") // Description, Limit Is 50
      .setEmoji("866864020442710036") // Emoji ID
      .setValue("kofi") // To Make Its Funtion When Use Click It

    // Fourth Option In Menu
    const Role4 = new MessageMenuOption()
      .setLabel("BitPay") // Label
      .setDescription("Makes accepting crypto payments simple.") // Description, Limit Is 50
      .setEmoji("866864038847053874") // Emoji ID
      .setValue("bitpay") // To Make Its Funtion When Use Click It

    const Menu = new MessageMenu()
      .setID("menu") // To Make Its Funtion When Use Click It
      .setPlaceholder("Choose any platform")
      .addOption(Role1)
      .addOption(Role2)
      .addOption(Role3)
      .addOption(Role4);
    // .setMaxValues(4) // How Many Roles They Can Select // How Many Selection They Can Make // Maximum
    // .setMinValues(1) // How Many Roles They Can Select // How Many Selection They Can Make // Minimum

    const RoleMenu = new MessageActionRow().addComponent(Menu);

    message.channel.send(`Select the platform you'd like to donate!`, {
      component: RoleMenu,
    });

    // Making Its Function
  //   this.client.on("clickMenu", async (m) => {
  // if (m.values[0] === "buycoffee") {
  //       // If User Click YouTube Then This Will Happen
  //       m.reply.defer();
  //       m.channel.send(`<@${m.clicker.id}> Added YouTube Role`).then((msg) => {
  //         // Send A Message In That Channel
  //         msg.delete({ timeout: 4000 }); // Delete After 4 Seconds
  //       });
  //       // m.clicker.member.send(`Added YouTube Role`) // Send A DM Also
  //     } else if (m.values[0] === "kofi") {
  //       // If User Click VS Code Then This Will Happen
  //       m.reply.defer();
  //       m.channel.send(`<@${m.clicker.id}> Added VS Code Role`).then((msg) => {
  //         // Send A Message In That Channel
  //         msg.delete({ timeout: 4000 }); // Delete After 4 Seconds
  //       });
  //       // m.clicker.member.send(`Added VS Code Role`) // Send A DM Also
  //     } else if (m.values[0] === "bitpay") {
  //       // If User Click GitHub Then This Will Happen
  //       m.reply.defer();
  //       m.channel.send(`<@${m.clicker.id}> Added GitHub Role`).then((msg) => {
  //         // Send A Message In That Channel
  //         msg.delete({ timeout: 4000 }); // Delete After 4 Seconds
  //       });
  //       // m.clicker.member.send(`Added GitHub Role`) // Send A DM Also
  //     }
  //   });
  }
};
