const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const currencySchema = new mongoose.Schema({
  guildID: reqString,
  userID: reqString,
  lastedEdited: String,
  cash: { type: Number, default: 0 },
  bank: { type: Number, default: 0 },
});

module.exports = mongoose.model("currency", currencySchema);
