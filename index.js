import express from 'express';
import { read } from './jsonFileStorage.js';

const app = express();

function mid(req,res,next) {
  //console.log(req.route);
  //console.log(req.query);
  console.log(req.params);
  next();
}

const extractRecipeByIndex = (request, response) => {
  read('data.json', (err, data) => {
    const {index} = request.params
    const recipe = data.recipes[index]
    //console.log(recipe);
      if (!recipe) {
      response.status(404).send('Sorry, we cannot find that!');
      return;
    }
    // Respond with the name at the index specified in the URL
    response.send(recipe);
  });
};

// index is a URL path parameter
app.get('/recipe/:index', mid, extractRecipeByIndex);

const extractRecipesByYield = (request, response) => {
  read('data.json', (err, data) => {
    let recipesFound = data.recipes.filter((recipe) => {
      return +request.params.yield === recipe.yield;
    })

    if (recipesFound.length === 0) {
      response.status(404).send('Sorry, we cannot find that!');
      // stop further execution in this callback
      return;
    } 
    // Respond with the recipe at the portion in the URL
    response.send(recipesFound);
  });
};

// yield is a URL path parameter
app.get('/yield/:yield', mid, extractRecipesByYield);

const extractRecipesByLabel = (request, response) => {
  read('data.json', (err, data) => {

    let recipeLabel = request.params.label;
    let convert = recipeLabel.replace(/-/g,' ').toLowerCase();

    let recipesFound = data.recipes.filter((recipe) => {
      return convert === recipe.label.toLowerCase();
    })

    if (recipesFound.length === 0) {
      response.status(404).send('Sorry, we cannot find that!');
      // stop further execution in this callback
      return;
    } 
    // Respond with the recipe at the portion in the URL
    response.send(recipesFound);
  });
};

// yield is a URL path parameter
app.get('/recipe-label/:label', mid, extractRecipesByLabel);


app.listen(3005);