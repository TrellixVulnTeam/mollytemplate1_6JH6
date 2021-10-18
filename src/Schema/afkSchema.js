const mongoose = require("mongoose");

const reqString = {
    type: String,
    required: true,
  };

const afkSchema = new mongoose.Schema({
    userID: reqString,
    reason: String,
    messagesleft: { type: Number, default: 3}
});

module.exports = mongoose.model("afk", afkSchema);
