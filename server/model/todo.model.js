const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Todo = new Schema({
  id: {
    type: String,
  },
  description: {
    type: String,
  },
  done: {
    type: Boolean,
  },
  bucket: {
    type: String,
  },
});

module.exports = mongoose.model("Todo", Todo);
