const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const roleSchema = new mongoose.Schema({
  userID: reqString,
  nameRole: String,
  roleID: reqString
});

module.exports = mongoose.model("roles", roleSchema);
