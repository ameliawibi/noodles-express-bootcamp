import express from "express";
import { recipes } from "../recipes.js";
export const router = express.Router();

router.get("/", (req, res) => {
  console.log("Request for homepage received");
  res.render("home");
});

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

router.get("/recipe/:label", getRecipeDetails);
