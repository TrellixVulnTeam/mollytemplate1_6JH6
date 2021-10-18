const { Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = (client) => {
  client.on("clickMenu", async (m) => {
    if (m.values[0] === "paypal") {
      m.reply.defer();
      m.clicker.member.send(`Here's the paypal link!\nhttps://www.paypal.com`);
    } else if (m.values[0] === "buycoffee") {
      m.reply.defer();
      m.clicker.member.send(
        `Here's the BuymeaCoffee link!\nhttps://www.buymeacoffee.com`);
    } else if (m.values[0] === "kofi") {
      m.reply.defer();
      m.clicker.member.send(`Here's the Ko-Fi link!\nhttps://www.ko-fi.com`);
    } else if (m.values[0] === "bitpay") {
      m.reply.defer();
      m.clicker.member.send(`Here's the BitPay link!\nhttps://bitpay.com`);
    }
    
  });
};
