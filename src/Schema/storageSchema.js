const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const storageSchema = new mongoose.Schema({
  guildID: reqString,
  userID: reqString,
  storage: Object
});

module.exports = mongoose.model("storage", storageSchema);
