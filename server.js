// Here is where we import modules

const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file

const express = require("express");// We begin by loading Express
const morgan = require("morgan");
const methodOverride = require("method-override");

require('./config/database'); //database code

const Fruit = require("./models/fruit.js");

const app = express();
app.use(methodOverride("_method"));
app.use(morgan ('dev'));



// GET /
app.get("/", async (req, res , next) => {
    res.render("index.ejs");
});

// GET /fruits/new
app.get("/fruits/new", (req, res, next) => {
    res.render("fruits/new.ejs");
});

app.use(express.urlencoded({ extended: false }));

// POST /fruits
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits/new");
});

// GET /fruits
app.get("/fruits", async (req, res, next) => {
    const allFruits = await Fruit.find();
    console.log(allFruits);
    res.render("fruits/index.ejs", { fruits: allFruits });
});

app.get("/fruits/:fruitId", async (req, res, next) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
});

app.delete("/fruits/:fruitId", async (req, res, next) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
});

// GET localhost:3000/fruits/:fruitId/edit
app.get("/fruits/:fruitId/edit", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    console.log(foundFruit);
    res.render("fruits/edit.ejs", {
        fruit: foundFruit,
      });
});

app.put("/fruits/:fruitId", async (req, res) => {
    // Handle the 'isReadyToEat' checkbox data
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    
    // Update the fruit in the database
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
  
    // Redirect to the fruit's show page to see the updates
    res.redirect(`/fruits/${req.params.fruitId}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});