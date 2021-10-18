const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const inventorySchema = new mongoose.Schema({
  guildID: reqString,
  userID: reqString,
  inventory: Object,
  storage: Object,
});

module.exports = mongoose.model("inventory", inventorySchema);
