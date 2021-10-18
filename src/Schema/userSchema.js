const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const userSchema = new mongoose.Schema({
  guildID: reqString,
  userID: reqString,
  userNicknTag: String
});

module.exports = mongoose.model("users", userSchema);
