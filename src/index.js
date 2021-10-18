const MollyClient = require("./Build/MollyClient");
const config = require("./Configuration/config.json");
const donationDrop = require("./Functions/buttons/donationDrop");
const ticketButtons = require("./Functions/buttons/ticketButtons");
const confessionDM = require("./Functions/confession/confessionDM");
const langButtons = require("./Functions/buttons/langButtons");
const starboard = require("./Functions/starboard/starboard");

const client = new MollyClient(config);
client.start();
require("discord-buttons")(client);

donationDrop(client);
ticketButtons(client);
confessionDM(client);
langButtons(client);
starboard(client);