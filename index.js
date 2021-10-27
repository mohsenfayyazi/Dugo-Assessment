"use strict";
//load configurations from .env file
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Author = require("./author.model");
const Book = require("./book.model");
const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World! TEST_1");
});

/*
curl --location --request GET 'http://localhost:3000/books/'
*/

app.get("/books", async (req, res) => {
  res.send(await Book.find());
});

/*
//For Test Please run in terminal
curl --location --request POST 'http://localhost:3000/books' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title":"Sample Book1",
    "description":"Sample Book1 desk ",
    "ISBN":"12131235",
    "Author":"617921a81d630f5220e9a9bc"
}'
*/

app.post("/books", async (req, res) => {
  const book = new Book(req.body);
  console.log(req.body);
  await book.save();
  res.send(book);
});

/*
//For Test Please run in terminal
curl --location --request PATCH 'http://localhost:3000/books/{your_id}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title":"Sample Book2",
    "description":"Sample Book1 desk ",
    "ISBN":"12131235",
    "Author":"617921a81d630f5220e9a9bc"
}'
*/

app.patch("/books/:id", async (req, res) => {
  const original = await Book.findById(req.params.id);

  if (!original) {
    res.send("book not found");
    return;
  }
  original.title = req.body.title || original.title;
  original.description = req.body.description || original.description;
  original.ISBN = req.body.ISBN || original.ISBN;
  original.Author = req.body.Author || original.Author;
  await original.save();
  res.send(original);
});

/*
//For Test Please run in terminal
curl --location --request DELETE 'http://localhost:3000/books/{your_id}'
*/
app.delete("/books/:id", async (req, res) => {
  const original = await Book.findById(req.params.id);

  if (!original) {
    res.send("book not found");
    return;
  }
  await original.remove();
  res.send("delete success");
});

/*
 //For Test Please run in terminal
 curl --location --request GET 'http://localhost:3000/authors/'
 */
app.get("/authors", async (req, res) => {
  res.send(await Author.find());
});

/* 
//For Test Please run in terminal
curl --location --request POST 'http://localhost:3000/authors' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"mohsen",
    "age":31
}'
*/

app.post("/authors", async (req, res) => {
  const author = new Author(req.body);
  console.log(req.body);
  await author.save();
  res.send(author);
});

/*
//For Test Please run in terminal

curl --location --request PATCH 'http://localhost:3000/authors/{your_id}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"mohsen f",
    "age":35
}'
*/

app.patch("/authors/:id", async (req, res) => {
  const original = await Author.findById(req.params.id);

  if (!original) {
    res.send("author not found");
    return;
  }
  original.name = req.body.name || original.name;
  original.age = req.body.age || original.age;
  await original.save();
  res.send(original);
});

/*
//For Test Please run in terminal

curl --location --request DELETE 'http://localhost:3000/authors/{your_id}'

*/
app.delete("/authors/:id", async (req, res) => {
  const original = await Author.findById(req.params.id);

  if (!original) {
    res.send("Author not found");
    return;
  }
  await original.remove();
  res.send("delete success");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
  mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected To Database: 
${process.env.MONGO_URI}`);
});
