const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const badgeSchema = new mongoose.Schema({
  badgeID: reqString,
  name: String,
  category: String,
  imgURL: String
});

module.exports = mongoose.model("badges", badgeSchema);

