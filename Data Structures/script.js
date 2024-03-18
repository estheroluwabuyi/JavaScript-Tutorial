'use strict';

//DESTRUCTURING ARAYS
//If we wanted to retrive each one into its variable without destructuring we'd say;
/*const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

console.log(a, b, c);

// We can declare the 3 variables at the same time using destructuring
const [x, y, z] = arr; //destructuring assignment = []
console.log(x, y, z);

//RESTURANT DESTRUCTURING PRACTICE
const resturant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    openingHours: {
        
        thu: {
    open: 12,
    close: 22,
        },
        fri: {
            open: 11,
            close: 23,  
        },
        sat: {
            open: 0, //open 24 hrs
            close: 24,  
        }, 
    },

    
    order: function(starterIndex, mainIndex){
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
        }
};

// const [first, second] = resturant.categories;
// console.log(first, second); //we'd get the first two elements of the categories array

// //To pick some elements and not pick some , we'd simply leave hole(s) on the element we are skipping
// const [firstC, , secondC] = resturant.categories;
// console.log(firstC, secondC);

let [main, , secondary] = resturant.categories
console.log(main, secondary);

//To switch 2 variables with each other, without destructuring;
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

//With destructuring;
[main, secondary] = [secondary, main]
console.log(main, secondary);

//To receive 2 return values from a function. Creating 2 variables out of one function call
const [starter, mainCouse] = resturant.order(2, 0);
console.log(starter, mainCouse);


//DESTRUCTURING NESTED ARRAYS
const nested = [2, 3, [5, 6]];
// const [i, , k] = nested;
// console.log(i, k);

const [i, , [j, k]]  = nested;
console.log(i, j, k);


//SETTING DEFAULT VALUES WHEN EXTRACTING VARIABLES
const [p, q, r] = [8, 9];
console.log(p, q, r); //we'd get undefined for the third value here but we can set default values to help manage this error.

const [e = 1, f =1 , g = 1] = [9, , 7];
console.log(e, f, g); //1 would be the fall back value fr the one without any value */




//DESTRUCTURING OBJECTS
// const resturant = {
//     rName: 'Classico Italiano',
//     location: 'Via Angelo Tavanti 23, Firenze, Italy',
//     categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//     starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//     mainMenu: ['Pizza', 'Pasta', 'Risotto'],

//     openingHours: {
//         thu: {
//     open: 12,
//     close: 22,
//         },
//         fri: {
//             open: 11,
//             close: 23,  
//         },
//         sat: {
//             open: 0, //open 24 hrs
//             close: 24,  
//         }, 
//     },
    
//     order: function(starterIndex, mainIndex){
//         return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
//         },

        // orderDelivery: function (obj) {
        //     console.log(obj);
        // }

        /*orderDelivery: function ({starterIndex = 1, mainIndex = 0, time = '20:00', address}) {
            console.log(
                `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
                );
        },*/

//         orderPasta: function (ing1, ing2, ing3) {
//             console.log(`Here is your pasta with ${ing1}, ${ing2}, and ${ing3}`);
//         },

//         orderPizza: function(mainIngredient, ...otherIngredients){
//        console.log(mainIngredient);
//        console.log(otherIngredients);
//         }
// };

// const rest1 = {
//     name: 'Capri',
//     // numGuests: 20,
//     numGuests: 0,
// }

// const rest2 = {
//     name: 'Capri',
//    owner: 'Giovanni Rossi',
// }


// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// console.log(rest1);
// console.log(rest2);

//THE OR ASSISNMENT OPERATOR
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// console.log(rest1);
// console.log(rest2);

//THE NULISH COALESCING ASSISNMENT OPERATOR (null or undefined)
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// console.log(rest1);
// console.log(rest2);
//Changes the OR for the nullish coalscing operator

//THE AND ASSISNMENT OPERATOR
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';

// rest1.owner &&= '<ANONYMOUS>';
// rest2.owner &&= '<ANONYMOUS>';

// console.log(rest1);
// console.log(rest2);












//objects inside parameter. We can even do destructuring inside of a parameter
/*resturant.orderDelivery({
    time: '22:30',
   address: 'Via del Sole, 21',
    time: '22:30',
    address: 'Via del Sole, 21',
    mainIndex:  2,
    starterIndex: 2,
});

// resturant.orderDelivery({
//     address: 'Via del Sole, 21',
//     starterIndex: 2,
// })*/

// //To destructure objects we use the curly braces and then provide the variable names that exactly match the property names that we want to retreive from the object. Since the order of elements in an object does not matter, we dont need to manually skip elements like we did in an array

// const {rName, openingHours, categories} = resturant;
// console.log(rName, openingHours, categories);

// //What if we wanted the variable names to be different from the property names? 
// //Of course we still need to refernce the property names like we did before, otherwise JS has no way of knowing what we actually want
// const {rName: resturantName, openingHours: hours, categories: tags} = resturant;
// console.log(resturantName, hours, tags);

// //Default Values
// //we can set default values for even values that dont exist
// const {menu = [], starterMenu: starters = []} = resturant;
// console.log(menu, starters);
// //menu here does not exist but set a default array value for it.

// //Mutating(Switching) variable swhy destructuring objects
// let a = 111;
// let b = 999;
//  const obj = {a: 23, b: 7, c: 14};
// ({a, b} = obj); //switching
// console.log(a, b);

// //DESTRUCTURING NESTED ARRAYS
// const {
//     fri: {open: o, close: c},
// } = openingHours;

// console.log(o, c);



// // THE SPREAD OPERATOR
// /*We can use the the spread operator[...] to expand an array into all  of its individual elements, basically unpacking all the array elements at once*/
// const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);
// //We can do the above better, thanks to ES6, we can use the spread operator

// const newArr = [1, 2, ...arr];
// console.log(newArr); //wed get the exact same  result as the badNewArr in our console
// /*What the spread operator does is to basically take all the elements out of the specified array and then write them individually as we wrote the values [7,8,9] manually*/
// //We can use the spread operator when we would otherwise have multiple values seperated by commas and that situation happens when we write literal arrays like the ones above
// //We can also use the spread operator to pass arguments into functions.

// console.log(...newArr, 10); //We use spread operator whenever we need elements of an array individually 
// //same as writing;
// console.log(1, 2, 7, 8, 9);

// // can be used to add new elements to an array
// const newMenu = [...resturant.mainMenu, 'Gnocci']; //building a new array
// console.log(newMenu);

// /*Important use cases of spread operator;
// -To create shallow copies array
// -To merge 2 arrays together
// */
// //COPY ARRAY
// const mainMenuCopy = [...resturant.mainMenu];

// //MERGE 2 OR MORE ARRAYS 
// const menuM = [...resturant.starterMenu, ...resturant.mainMenu, 'Lasgne'];
// console.log(menuM);


// //Spread operator works on all iterables. OBJECTS are not iterables. Iterables are arrays, strings, maps and sets.
// const str = 'Esther';
// const letters = [...str, ' ', 'S'];
// console.log(letters);
// console.log(...str);

// //Working on function arguments [Real world example]
// //const ingredients = [prompt("Let's make pasta! ingredient 1?"), prompt("ingredient 2?"), prompt("ingredient 3?")];
// //const ingredients = [prompt('Let\'s make pasta! Ingredient 1?')];
// //console.log(ingredients);

// //calling the  function
// //resturant.orderPasta(...ingredients);
// //resturant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

// //OBJECTS
// //since ES 2018, S.O actually also worked on objects even though objects are not iterables
//  const newResturant ={foundedIn:1998, ...resturant, founder: 'Guiseppe'};
//  //with the spread operator we can easily copy all the props of resturant obj directly into this newResturant obj
//  console.log(newResturant);

//  const resturantCopy = {...resturant};
//  resturantCopy.rName = 'Ristorante Roma';
//  console.log(resturantCopy.rName);
//  console.log(resturant.rName);
//  //WORKS JUST LIKE OBJECT.ASSIGN


/*
 //REST PATTERN[R.P] AND PARAMETERS
// Rest pattern looks exactly like S.O. It has the same syntax [3 dots] as the S.O, but does the exact opposite of what S.O does.
//S.O unpacks and array, while R.P packs ellements into an array

//The below is a S.O bcos on the right side of '='. But when the syntax is on the left side of the '=' sign, it is the R.P
const arR = [1, 2, ...[3, 4]];

//R.P bcus on the left side of the '=' sign
const [a, b, ...others] = [1, 2, 3, 4, 5]
//It is called REST because it would take the rest of the elements not given its own special variable and put them inside an array
console.log(a, b, others);

// const uu = [...resturant.mainMenu, ...resturant.starterMenu];
// console.log(uu);

//Using R.P while destructuring with S.O
const [pizza, ,risotto, ...otherFood] = [...resturant.mainMenu, ...resturant.starterMenu];
console.log(pizza, risotto, otherFood);
//we get the string pizza, the string risotto and get a whole new array for the strings that were not given special variable
//The problem is that JS does not know till when it should collect the 'the rest' of the elements
//There can only be one R.P in any destructuring assignment

//R.P on OBJECTS
//only diff here is that it would collect elements into new objecsts instead of new arrays
const {sat, ...weekdays} = resturant.openingHours;
console.log(weekdays);

//R.P on functions [Its called Rest Parameters here]
const add = function(...numbers) {
//console.log(numbers);

let sum = 0;
for (let i = 0; i < numbers.length; i++) sum += numbers[i]
console.log(sum);

};

add(2,3);
add(5, 3, 4, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);
//packs all these into an array

const x= [23, 5, 7];
add(...x);

//orderPizza Function
resturant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
resturant.orderPizza('mushrooms'); */


//Short Circuiting (&& and ||)
//THE OR OPERATOR SHORT CIRCUITING
/*3 properties of logical operators; *They can return any data type *They do something called short circuiting (evaluation) *They Ccan use any data type */

/*
console.log(3 || 'Esther');
console.log('' || 'Esther');
console.log(true || 0);
console.log(undefined|| null);
//The result of an || operator doesn't have to be a boolean

console.log(undefined || 0 || '' || 'Hello' || 23 || null);
//We got 'Hello' in the console because it is the first truthy that was value in the operation
const guest1 = resturant.numGuests ? resturant.numGuests : 10;
console.log(guest1);
//resturant.numGuests does not exist so 10 would be the result
resturant.numGuests = 23;
const guest2 = resturant.numGuests || 10
console.log(guest2);
//the result of  guest2 would be 10 assuming the numGuests is 0

//AND OPERATOR SHORT CIRCUITING
console.log('------------ AND ------------');
//IN SHORT CIRCUITING evaluation the AND operator works in the exact opposite of the OR operator
console.log(0 && 'Jonas');
//we'd get 0 in the console because the AND  operator short circuits when the first operand is falsy without even evaluating the operand
console.log(7 && 'Jonas');
console.log('Hello' && 23 && null && 'Jonas');
if (resturant.orderPizza) {
    resturant.orderPizza('mushrooms', 'spinach')
};

resturant.orderPizza && resturant.orderPizza('mushrooms', 'spinach');*/

//THE NULLISH COALESCING OPERATOR (??)
//this operator was introduuced in ES2020

// resturant.numGuests = 0;
// const guests = resturant.numGuests || 10
// console.log(guests);

///the result of  guests is 10 because the numGuests is 0. But the actual guest number is 0, how do fix this? This is where the nullish coalescing comes

//Nullish values are null and undefined (IT DOES NOT INCLUDE ZERO OR AN EMPTY STRING)

// const guestCorrect = resturant.numGuests ?? 10;
// console.log(guestCorrect);

//this works like that because the nullish coalescung value works with the idea of the nullish value instead pf te falsy value

//For the nullish operator it is as if the zero and the empty strings were truthy value and not falsy

//LOGICAL ASIGNMENT OPERATORS introduced in ES2021


 //3.
//with the help of enhanced obj lit, we can now compute prop names instead of having to write them out manually and literally
/*const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const  openingHours = {
    [weekdays[3]]: {
open: 12,
close: 22,
    },

   [weekdays[4]]: {
        open: 11,
        close: 23,  
    },

    // [`day-${2 + 4}`]: {
    //     open: 0, //open 24 hrs
    //     close: 24,  
    // }, 
    [weekdays[5]]: {
        open: 0,
        close: 24,  
    },
};

console.log(openingHours);
// const  openingHours = {
//     thu: {
// open: 12,
// close: 22,
//     },
//     fri: {
//         open: 11,
//         close: 23,  
//     },
//     sat: {
//         open: 0, //open 24 hrs
//         close: 24,  
//     }, 
// };


const resturant = {
    rName: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
 
    //instead of this;
    // openingHours: openingHours, 

    //ES6 ENHANCED OBJECT LITERALS;  ES6 introduced 3 ways of writing object literals;
    //1. 
    openingHours, //this properties of the openingHours obj becomes part of this resturant obj

    //2.
//We can now write obj methods like this without using the the function keyword;
    order(starterIndex, mainIndex){
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
        },

        orderDelivery(obj) {
            console.log(obj);
        }

};

console.log(resturant);


/*
//LOOPING ARRAYS THE FOR-OF LOOP
const menu = [...resturant.starterMenu, ...resturant.mainMenu]

// instead of;
// for (let i = 0; i<= menu.length; i++) {
//     console.log(menu[i]);
// }

for (const item of menu) {
    console.log(item);
}
//this would loop over the entire array and give us access to the current array element
//WE CAN USE THE CONTINUE AND BREAK KEYWORDS IN THE FOR-OF LOOP

//What if we want the current index and not the current element?
//It is pain to get the main index in a a for-of loop. For-of loop was originaly meant to give you the current element. We can however get both. In order to do that, we would have to use the entries method on the for-of loop

// for (const item of menu.entries()) {
//     // console.log(item);
//     console.log(`${item[0] + 1}: ${item[1]}`);
// }

for (const [i, el] of menu.entries()) {
    // console.log(item);
    console.log(`${i + 1}: ${el}`);
}

// console.log([...menu.entries()]); */


//OPTIONAL CHAINING (?.) introduced in ES2020
//OPTIONAL CHAINING ON OBJECTS
//console.log(resturant.openingHours.mon);
/*if (resturant.openingHours && resturant.openingHours.mon) console.log(resturant.openingHours.mon.open);

//without optional chaining we would get an error.
//console.log(resturant.openingHours.mon.open);


//with optional chaining
//with optional chaining, if a certain property does  not exist, then undefined is returned immediately
console.log(resturant.openingHours.mon?.open);
//only if the property before the ? (mon) exists,then the open property would be read from there[be executed]
//console.log(resturant.openingHours?.mon.open);


//EXAMPLE
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
 //   console.log(day);
    let open = resturant.openingHours[day]?.open ?? 'closed'

    // if (open === undefined) {
    //     open = `closed`
    // }
    console.log(`On ${day}, we open at ${open}`);
}

//METHODS
console.log(resturant.order?.(0, 1) ?? 'Method does not exist');
//The method actually exist so we get the expected result

console.log(resturant.orderRisotto?.(0, 1) ?? 'Method does not exist');
//what happens is that the optional chaining opertor will check if orderRisotto actually exists and if it doesnt, then it would immiediately return undefined, the nullish coalescing operator immiediately goes to the second operand 'Method does...'

//OPTIONAL CHAINING ON ARRAYS
const user = [{name: 'Jonas', email: 'hello@jonas.io'}];
//const user = [];
console.log(user[0]?.name ?? 'User array does not exist');

//without the OPTIONAL CHAINING, we would have said:
if (user.length > 0) console.log(user[0].name); 
else console.log('User array is empty');

//Looping Objects: Objects Keys, Values, And Entries
//We can loop over objects which are not iterables in an indirect way

//object.keys (Property NAMES)
const properties = Object.keys(openingHours);
let openStr = (`We are open on ${properties.length} days: `);

for (const day of (properties)) {
   openStr += `${day}, `
}
console.log(openStr);
// for (const day of Object.keys(openingHours)) {
//     console.log(day);
// }

//Property VALUES
const values = Object.values(openingHours);
console.log(values);

//ENTRIES
//Entries are names + values together
const entries = Object.entries(openingHours);
console.log(entries);

for (const[ key, {open, close}] of entries) {
    console.log(`On ${key} we open at ${open} and close at ${close}`);
};
//we destructured the open and close objescts using{ }. But if we had simple object with a simple value, we would only do; [key, value] as destructuring */



//SETS (ES6)
//A set is a collection of unique  values. It can never have any dupliate
/*const orderSet = new Set([
    'Pasta', 
    'Pizza', 
    'Pizza', 
    'Risotto',
    'Pizza'
]);
console.log(orderSet);
console.log(new Set('Jonas'));

//How to work with SET
//we can check the size of a set
console.log(orderSet.size);

//to check if a certain element is in a set
console.log(orderSet.has('Pizza'));
console.log(orderSet.has('Bread'));

//adding new elements
orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
console.log(orderSet);

//Deleting elements
orderSet.delete('Risotto');
console.log(orderSet);

//Retrieving values from SETS
//we can not do console.log(orderSet[0]); like in arrays here. This is because there are no indexes in SETS. There is  no way(no need) of getting values out of a set. Since all values are unique and if their orders deas not matter, there is no point retrieving the values

//clearing all sets element
// orderSet.clear();
// console.log(orderSet);

//Looping over Sets
for (const order of orderSet) console.log(order);

//The main usage of sets is to remove duplicate values
//Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// const staffUnique = new Set(staff);
// console.log(staffUnique);

//to convert to array, wed use the spread operator
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

//to know how many unique values are there
console.log(
    new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);

//We could use set to count how many diff letters there are in a string
console.log(
    new Set('jonasschmedtmann').size
); */



//MAPS:Fundamentals
//Maps are data structures that we can use to match values to keys
//Just like in objects, data is stored in key-value pairs in Maps
//Diff btw maps and sets is that in objects, the keys are always strings, but in maps the keys can be any type. It could even be object, an array or even other maps.
// const rest = new Map ();
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Frenze, Italy');
// console.log(rest.set(2, 'Libson, Portugal'));
// //Calling the set method like this does not only update the map method that it is called on but also returns the map. That is evn if decide to log only the last set, everything in the map will be logged into our console
// //console.log(rest);

// rest
//     .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//     .set('open', 11)
//     .set('close', 23)
//     .set(true, 'We are open :D')
//     .set(false, 'We are closed :(');

//    console.log(rest.get('name'));
//    console.log(rest.get(true));
//    console.log(rest.get(1));

//    //const time = 8;
//    const time = 21;
//    console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

//    //Maps method
//    //has(): to check if map contains certain element
//    console.log(rest.has('categories'));

//    //delete(): to delete elements from map
//    console.log(rest.delete(2));
//    console.log(rest);

//    //size: to get size of map
//    console.log(rest.size);

//    //clear(): to clear all elements from maps
// //   rest.clear();
//  // console.log(rest);

//  //Using arrays as keys
//  // rest.set([1,2], 'Test');
//  //console.log(rest.get([1,2]));
// //this won't work. In order to make it work, we'd have to create a new array
//  const arr = [1,2];
//  rest.set(arr, 'Test');
// console.log(rest.get(arr));

// // Using objects as keys
//  rest.set(document.querySelector('h1'), 'Heading');


//  //MAPS: Iteration
// //Others ways of adding elements to maps

// const openingHours = {
        
//     thu: {
// open: 12,
// close: 22,
//     },
//     fri: {
//         open: 11,
//         close: 23,  
//     },
//     sat: {
//         open: 0, //open 24 hrs
//         close: 24,  
//     }, 
// };


// const question = new Map([
//     ['Question', 'What is the best programming language in the world?'],
//     [1,'C'],
//     [2, 'Java'],
//     [3, 'JavaScript'],
//     ['correct', 3],
//     [true, 'Correct'],
//     [false, 'Try again'],
// ]);
// console.log(question);

// //Converting objects to Maps
// console.log(Object.entries(openingHours));
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// //Iteration (quiz app)
// console.log(question.get('Question'));
// for (const [key, value] of question) {
//     //we only want to print an element if the key is a number

//     if (typeof key === 'number') {
//         console.log(`Answer ${key}: ${value}`);
//     }
// }

// //const answer = Number(prompt('Your Answer'));
// const answer = 3;
// console.log(answer);

// console.log(question.get(question.get('correct') === answer));

// //Converting Maps to Arrays
// console.log([...question]);
// //console.log(question.entries());
// console.log([...question.keys()]);
// console.log([...question.values()]);

//WHICH DATA STRUCTURES TO USE
//there are 3 essential sources of data;
//FROM THE PROGRAM ITSELF: data written directly in source code (e.g. status messages that would be displayed on webpages based on user actions)
//FROM THE UI: data input from the user or data written in DOM (e.g. tasks in todo app)
//FROM EXTERNAL SOURCES: Data fetched fo example from web API (e.g. recipe objects)
//No matter where the data comes from or what kind of data it is, we usually have COLLECTIONS OF DATA that we then to store somewhere. And where do we store collections of data, we use DATA STRUCTURES

//WORKING WITH STRINGS
//Strings are also zero based
// const airline = 'TAP Air Portugal';
// const plane = 'A320';

// //To get positions of character
// console.log(plane[0]);
// console.log(plane[1]);
// console.log(plane[2]);
// console.log('B737'[0]);

// //To get length
// console.log(airline.length);
// console.log('B737'.length);

// //STRING METHODS
// //indexOf
// console.log(airline.indexOf('r'));
// //lastIndexOf of specified char
// console.log(airline.lastIndexOf('r'));
// //indexOf search for entire word
// console.log(airline.indexOf('Portugal'));

// //slice method
// console.log(airline.slice(4));
// console.log(airline.slice(4,7));
// console.log(airline.slice(0, airline.indexOf(' ')));
// console.log(airline.slice(airline.lastIndexOf(' ') + 1));

// //To start extraction from the end
// console.log(airline.slice(-2));
// //we can also specify a negative end parameter
// console.log(airline.slice(1, -1));

// const checkMiddleSeat = function (seat) {
//     //B and E are middle seats
//     let s = seat.slice(-1);
//     if (s === 'B' || s === 'E') {
//         console.log('You got the middle seat :(');
//     } else {
//         console.log('You got lucky ;)');
//     }
// }

// checkMiddleSeat('19B');
// checkMiddleSeat('25C');
// checkMiddleSeat('3E');

// //To change text case
// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

// //FIX CAPITALIZATION IN NAME
// const passenger = 'jOnAS'
// const passengerLower = passenger.toLowerCase();
// const passengerCorrect = passenger[0].toUpperCase() + passengerLower.slice(1);
// console.log(passengerCorrect);

// const changeTextsCase = function (a) {
//     const passenger1 = a;
// const passengerLower1 = a.toLowerCase();
// const passengerCorrect1 = a[0].toUpperCase() + passengerLower1.slice(1);
// console.log(passengerCorrect1);
// };

// changeTextsCase('moSeS');
// changeTextsCase('isaiah');
// changeTextsCase('mAYa');
// changeTextsCase('bruno');
// changeTextsCase('Racheal');

// //comparing emails
// const email = 'hello@jonas.io';
// const logInEmail = '   Hello@jonas.Io \n';

// //first step is to convert logInEmail to lowercase
// const lowerEmail = logInEmail.toLowerCase();

// //get rid of whitespace with trim()
// // const trimmedEmail = lowerEmail.trim();
// // console.log(trimmedEmail);

// //another way of doing that;
// const normalizedEmail = logInEmail.toLowerCase().trim();
// console.log(normalizedEmail);
// console.log(email === normalizedEmail);

// //REPLACING PART OF STRIINGS
// const priceGB = '288,97E'
// const priceUS = priceGB.replace('E', '$').replace(',', '.');
// console.log(priceUS);

// //REPLACING WORDS OF STRINGS
// const announcement = 'ALL passengers come to boarding door 23. Boarding door 23!';
// console.log(announcement.replace('door', 'gate'));
// //the replace method only works for one word. To target all occurrence, we'll use a REGULAR expression
// console.log(announcement.replace(/door/g, 'gate'));

// //Methods that return boolean 'includes, startWith and endWith'
// const plane1 = 'Airbus A320neo';
// console.log(plane1.includes('A320'));
// console.log(plane1.includes('Boeing'));
// console.log(plane1.startsWith('Airb'));

// if (plane1.startsWith('Airbus') && plane1.endsWith('neo')){
//     console.log('Part of the NEW Airbus family');
// }

// //Practice Exercise
// const checkBaggage = function (items) {
//     const baggage = items.toLowerCase();
//    const baggageCorrect = baggage[0].toUpperCase() + baggage.slice(1);
//     //console.log(baggageCorrect);

//     if (baggage.includes('knife') || baggage.includes('gun')) {
//         console.log('You are NOT allowed on board');
//     } else {
//         console.log('Welcome aboard');
//     }
// };

// checkBaggage('I have a laptop,  some Food and a pocket Knife');checkBaggage('Socks and Camera');
// checkBaggage('Got some snacks and a gun for protection');

// //SPLIT METHOD
// //Split allows us to split a string into multiple parts based on a divider string
// console.log('a+very+nice+string'.split('+'));
// //what happens is that it will split this string by the  plus sign and it would then store the string into an array.

// //console.log(...'Jonas Smith'.split(' '));
// console.log('Jonas Smith'.split(' '));
// const [firstName, lastName] = 'Jonas Smith'.split(' ');
// console.log(firstName, lastName);

// //THE JOIN METHOD
// //const newName = ['Mr.', firstName, lastName.toUpperCase()].join('---');
// const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
// console.log(newName);

// //CAPITALIZING STRINGS
// const capitalizeName = function (name) {
//     const names = name.split(' ');
//     const namesUpper = [];

//     for (const n of names) {
//        // namesUpper.push(n[0].toUpperCase() + n.slice(1));
//        namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
//     }
//     console.log(namesUpper.join(' '));
// };


// capitalizeName('jessica anne smith davis');
// capitalizeName('jonas schmedtmann');

// //Padding a String 
// //Means adding a number of characters to a string until the string has a certain desired length.
// const message = 'Go to gate 23!';
// console.log(message.padStart(25, '+').padEnd(30, '+'));
// console.log('Jonas'.padStart(25, '+').padEnd(30, '+'));

// const maskCreditCard = function (number) {
//     const str = number + '';
// const last = str.slice(-4);
// return last.padStart(str.length, '*');
// }
// console.log(maskCreditCard(89035515687));
// console.log(maskCreditCard(4378989026789087));
// console.log(maskCreditCard('985578009875557'));

// //THE REPEAT METHOD
// const message1 = 'Bad weather.... All Departures Delayed.... ';
// console.log(message1.repeat(5));

// const planesInline = function (n) {
//     console.log(`There are ${n} planes in line ${'*>'.repeat(n)}`);
// }
//  planesInline(5);
//  planesInline(3);
//  planesInline(11);


// CODE PRACTICE
//write program that receives a list variables written in underscore_case and converts them to camelCase


// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));

// const text = document.querySelector('textarea').value;


// STRING METHOD IN PRATICE

const u = 'i am a girl'
 console.log(u.replaceAll('a', 'b'));