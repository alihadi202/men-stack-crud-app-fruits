// Here is where we import modules

const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file

const express = require("express");// We begin by loading Express
const morgan = require("morgan");

require('./config/database'); //database code

const Fruit = require("./models/fruit.js");

const app = express();
app.use(morgan ('dev'));



// GET /
app.get("/", async (req, res , next) => {
    res.render("index.ejs");
});

// GET /fruits/new
app.get("/fruits/new", (req, res, next) => {
    res.render("fruits/new.ejs");
});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});