
//Importing Module
// import { addToCart, totalPrice as price, QT } from "./shoppingCart.js";

// console.log(price, QT);
// console.log(totalPrice, totalQuantity);
// addToCart('books', 5);

console.log('Importing Module');
// console.log(shippingCost);

//Importing all exports of a module
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('books', 5); ///giving public API/object
// console.log(ShoppingCart.totalPrice);
// console.log(ShoppingCart.QT);

// //Automatically import export no mater what that is called and even if its in fact not called anything
// import add, { addToCart, totalPrice as price, QT } from './shoppingCart.js'; // Avoid mixing default and named exports like this to reduce complexities
// console.log(price);

//In practice, we usually don't mix named and default exports in the same module. The preferred style is to use one default export per module. No need for curly braces for default exports

// import add from './shoppingCart.js';

import add, { cart } from './shoppingCart.js';
add('pizza', 2);
//Imports are live connection to exports
add('bread', 5);
add('books', 15);
add('apples', 7);

console.log(cart);
//imports are not copies of the export but a live connection because they point to same place in memory


/**
//TOP-LEVEL AWAIT
// console.log('Start Fetching');

// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  return {title: data.at(-1).title, text: data.at(-1).body};
  //using '.at(-1)' we'd get the last object in the data array-so basically instead of saying data[99].title or .body
};

// const lastPost = getLastPost();
// console.log(lastPost);
//doing this isn't very clean
// lastPost.then(last => console.log(last))

const lastPost2 = await getLastPost();
console.log(lastPost2);

import shoppingCart from "./shoppingCart";
 */

/*
//The Module Pattern
const ShoppingCart2 =(function () {
  const cart = [];
  const shippingCost = 10;
  const  totalPrice = 237;
  const totalQuantity = 23;

  const addToCart =  function (product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart (shipping cost is ${shippingCost})`);
    //even tho shippingCost was not exported, this function was still able to access it..happened because of closures (A function is able to access the var in his birthplace)
}

const orderStock = function (product, quantity) {
  cart.push({product, quantity});
  console.log(`${quantity} ${product} ordered from supplier`);
}

// We'd return an object which contains the stuff that we want to make public. The var we didn't pass in here (pass in) wont be made public
return{
addToCart,
cart,
totalPrice,
totalQuantity,
}
//We could have however defined these vars in the obj
})();

ShoppingCart2.addToCart('apples', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.totalQuantity);
// console.log(ShoppingCart2.shippingCost); //we'd get undefined for this cause it was made private...not exported
*/

/*
//CommonJS Modules
//Export...all these wont work in our browser but will work in nodejs
export.addToCart = function (product, quantity) {
  cart.push({product, quantity});
  console.log(`${quantity} ${product} ordered from supplier`);
}

//Import
const {addToCart} = require('./shoppingCart.js');
 */


//Introduction To NPM
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],

  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state); //t create a copy of an obj

console.log(stateClone);
 //Although this was cloned, its still a copy of the state obj. We can see that when we changed the value of user.loggedIn, it also reflected in the stateClone. This tells us that stateClone is not a just a clone but a copy of state. To fix this, we'd uses the lodash cloneDeep module

//Lodash cloneDeep.js module
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;

console.log(stateDeepClone);
//this is truly cloned. It retained its values even tho the original value from where its cloned from was replaced
// stateDeepClone.user.loggedIn = 'YES'


//To activate HOT MODULE REPLACEMENT FOR PARCEL (Only parcel understands this line of code..browser dont understand so it wont make it to our final bundle)
if (module.hot) {
  module.hot.accept()
} //What this line of code is saying is that whenever we change something in the code, it wont reload the page..it just gets auto injected.

  //  "test": "echo \"Error: no test specified\" && exit 1"

//   "start": "parcel index.html",
//  "build": "parcel build index"
//  "main": "script.js",