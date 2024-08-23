//Importing Others
import * as model from './model.js'; //this would import everything from model.js
import recipeView from './view/recipeView.js'; //default module
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import bookmarksView from './view/bookmarksView.js';
import paginationView from './view/paginationView.js';
import addRecipeView from './view/addRecipeView.js';

if (module.hot) {
  module.hot.accept();
  //this basically stops th constant reload of page when a code is added  or removed-it maintains the state
}

//Importing images
//The images in our html wont show because they are the real html file with src path diff from the one in the parcel html file with diff path. We however need to import those images. In parcel, we can import all kinds of assets(including images) and files and not just javascript file;
// import icons from '../img/icons.svg'// Parcel 1
// import icons from 'url:../img/icons.svg'; //Parcel  2: for static assets that are not programming files e.g images, videos, svg, sound files etc. (../ is for parent folders)

// importing packages
import 'core-js/stable'; //Polyfilling js features like Promise,Array.from, Object.assign,
import 'regenerator-runtime/runtime'; //Polyfilling async/await
import searchView from './view/searchView.js';
import addRecipeView from './view/addRecipeView.js';
// import recipeView from './views/recipeView.js';

///////////////////
//////////////////

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    //Monitoring the hashchange
    const id = window.location.hash.slice(1);

    if (!id) return;
    //that is if no id, return to the normal state without any err

    recipeView.renderSpinner();
    //Happens before and while API loads in bg

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPerPage());
    // resultsView.render(model.getSearchResultsPerPage());
    
    // 1) Updating bookmarksView
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading Recipe (model.js)
    await model.loadRecipe(id); //loadRecipe param 'id' now === const id = window.location.hash.slice(1);
    //loadRecipe is an async func so its going to return a promise. We therefore need to await the promise before we can move on in the next step of the execution of the async function. **This current await statement does not return anything so we are not storing any result into a var
    //  const {recipe} =  model.state;
    //  const recipe = model.state.recipe

    // 3) Rendering Recipe (model.js)
    // const recipeView = new recipeView(model.state.recipe)
    recipeView.render(model.state.recipe);


    //OOP---RecipeView method
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Rendering results

    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPerPage());

    // 4) Render the initial pagination btns
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 3) Rendering NEW results

  resultsView.render(model.getSearchResultsPerPage(goToPage));

  // 4) Render NEW pagination btns
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
  //console.log(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = function (newRecipe) {
  console.log(newRecipe);

  //Upload the new recipe data
  
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
