const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const RRSchema = new mongoose.Schema({
  guildID: reqString,
  message: String,
  Roles: Object,
});

module.exports = mongoose.model("reaction-roles", RRSchema);