import { async } from 'regenerator-runtime';
import { API_URL } from './config';

//so the state obj is basically what we are going to keep referring to in the controller.js
export const state = {
  recipe: {},
};

//function responsible for fetching the recipe data from our forkify API
export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `${API_URL}/${id}`
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e856b'
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

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
    alert(err);
  }
};
