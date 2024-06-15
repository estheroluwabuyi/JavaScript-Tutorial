

//Exporting Module
console.log('Exporting Module');

//Blocking Code
console.log('Start fetching users');
// await  fetch('https://jsonplaceholder.typicode.com/posts');
console.log('Finish Fetching Users');

//Variables declared inside a module are scoped to the current module
const shippingCost = 10;
export const cart = [];

//Named Export
export const addToCart = function (product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
}

const totalPrice = 237;
const totalQuantity = 23;
// export{totalPrice, totalQuantity}
export{totalPrice, totalQuantity as QT}

//Default Exports
//We use default exports when we want to export one thing per module
export default function (product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
}