const mongoose = require("mongoose");


const transcriptSchema = new mongoose.Schema({
  content: Array,
  channel: String
});

module.exports = mongoose.model("transcripts", transcriptSchema);
