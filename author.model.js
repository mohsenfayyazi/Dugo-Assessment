const mongoose = require("mongoose");

const Author = mongoose.model("Author", {
  name: String,
  age: Number,
});

module.exports = Author;
