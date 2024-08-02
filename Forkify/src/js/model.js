import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

//so the state obj is basically what we are going to keep referring to in the controller.js
export const state = {
  recipe: {},
};

//function responsible for fetching the recipe data from our forkify API
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    // const  reciper  = data.data.recipe;

    state.recipe = {
      id: recipe.id, //recipe referred to here is; const  reciper  = data.data.recipe;
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (err) {
    //Temporary Error Handler
    console.log(`${err} 💥💥💥`);
    throw err;
  }
};
