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