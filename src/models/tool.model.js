const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ToolSchema = new Schema({
  title: String,
  link: String,
  description: String,
  tags: [],
});

module.exports = mongoose.model('Tool', ToolSchema);
