import { async } from 'regenerator-runtime';
import { API_URL, RESULT_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

//so the state obj is basically what we are going to keep referring to in the controller.js
export const state = {
  recipe: {},

  search: {
    query: '',
    results: [],
    resultsPerPage: RESULT_PER_PAGE,
    page: 1
  },
};

//function responsible for fetching the recipe data from our forkify API
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

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
  } catch (err) {
    //Temporary Error Handler
    console.log(`${err} 💥💥💥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        //we map this because the recipes are inside an array. Doing this will get the recipes from its current array to a new array with a new obj
      };
    });
  } catch (err) {
    console.log(`${err} 💥💥💥`);
    throw err;
  }
};

export const getSearchResultsPerPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
