import express from "express";
import { recipes } from "./recipes.js";

const app = express();

// Set view engine
app.set("view engine", "ejs");
// serve static files
app.use(express.static("public"));

const getRecipeDetails = (req, res) => {
  let recipeLabel = req.params.label;
  let convert = recipeLabel.replace(/-/g, " ").toLowerCase();

  let recipesFound = recipes.recipe.filter((item) => {
    return convert === item.title.toLowerCase();
  });
  //console.log(recipesFound);

  if (recipesFound.length === 0) {
    res.status(404).send("Sorry, we cannot find that!");
    // stop further execution in this callback
    return;
  }

  let newData = {};
  newData["recipe"] = recipesFound;
  res.render("recipes", newData);
};

app.get("/recipe/:label", getRecipeDetails);

app.listen(3004);
