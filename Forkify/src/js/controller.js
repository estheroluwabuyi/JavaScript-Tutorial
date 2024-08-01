//Importing Others
import * as model from './model.js'; //this would import everything from model.js
import recipeView from './views/recipeView.js'; //default module

//Importing images
//The images in our html wont show because they are the real html file with src path diff from the one in the parcel html file with diff path. We however need to import those images. In parcel, we can import all kinds of assets(including images) and files and not just javascript file;
// import icons from '../img/icons.svg'// Parcel 1
// import icons from 'url:../img/icons.svg'; //Parcel  2: for static assets that are not programming files e.g images, videos, svg, sound files etc. (../ is for parent folders)

// importing packages
import 'core-js/stable'; //Polyfilling js features like Promise,Array.from, Object.assign,
import 'regenerator-runtime/runtime'; //Polyfilling async/await
// import recipeView from './views/recipeView.js';

///////////////////
//////////////////
const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipes = async function () {
  try {
    //Monitoring the hashchange
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return; 
    //that is if no id, return to the normal state without any err

    //Rendering Spinner (recipeView.js)
    recipeView.renderSpinner(); 
    //Happens before and while API loads in bg

    // 1.) Loading Recipe (model.js)
    await model.loadRecipe(id); //loadRecipe param 'id' now === const id = window.location.hash.slice(1);
    //loadRecipe is an async func so its going to return a promise. We therefore need to await the promise before we can move on in the next step of the execution of the async function. **This current await statement does not return anything so we are not storing any result into a var
    //  const {recipe} =  model.state;
    //  const recipe = model.state.recipe

    // 2.) Rendering Recipe (model.js)
    // const recipeView = new recipeView(model.state.recipe)
    recipeView.render(model.state.recipe);
     //OOP---RecipeView method
  } catch (err) {
    alert(err);
  }
};
controlRecipes();

//Nice and easy way of handling more than one event listener
// window.addEventListener('hashchange', controlRecipes)
// window.addEventListener('load', controlRecipes)

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));

//.join('') on the map method converts the array to a string
