const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const vipSchema = new mongoose.Schema({
  guildID: reqString,
  userID: reqString,
  isVIP: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("vip", vipSchema);
