const express = require("express");
let app = express.Router();

const auth = require("../middleware/auth");
const { addBook, showBook, deleteBook } = require("../controllers/user");

app.post("/addBook", auth, addBook);

app.get("/showBook", auth, showBook);

app.post("/deleteBook", auth, deleteBook);

module.exports = app;
