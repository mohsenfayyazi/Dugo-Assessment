const { Schema, model } = require("mongoose");

const Book = model("Book", {
  title: String,
  description: String,
  ISBN: String,
  Author: Schema.Types.ObjectId,
});

module.exports = Book;

