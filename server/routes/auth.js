const express = require("express");
let route = express.Router();

const { login, register } = require("../controllers/auth");

route.post("/login", login);
route.post("/register", register);

module.exports = route;
