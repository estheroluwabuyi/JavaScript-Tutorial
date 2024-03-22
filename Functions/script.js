'use strict';

/* //DEFAULT PARAMETERS
const bookings = [];

const createBooking = function (flightNum, newPassengers = 1, price = 199 * newPassengers) {

// SETTING DEFAULT PARAMETERS
//ES5
//flightNum = flightNum || LH345
// newPassengers = newPassengers || 1;
// price = price || 199

  const booking = {
        flightNum,
        newPassengers,
        price
    }

bookings.push(booking);
console.log(booking);
}

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH476', 5);

//SKIPPING A DEFAULT PARAMETER WE WANT TO LEAVE AT ITS DEFAULT
createBooking('LH789', undefined, 1000);  


//HOW PASSING ARGUMENTS WORKS: Values VS Reference
const flight = 'LH234 ';
const jonas = {
    name: 'Jonas Schemedtmann',
    passport: 2435689678
}



const checkIn = function (flightNum, passenger) {
    flightNum = 'LH999';
    passenger.name = 'Mr.' + passenger.name;


    if (passenger.passport ===  2435689678) {
        alert('Checked In🎉🎊✨')
        console.log(passenger.passport);
    }else{
        alert('Wrong Passport!😥');
        console.log(passenger.passport);

    }
}

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// //same as 
// const  flightNum = flight;
// const passenger = jonas;


const newPassport = (person) =>{
person.passport = Math.trunc(Math.random() * 10000000000);
}
newPassport(jonas);
checkIn(flight, jonas)

/*
In programming, there are two terms that are used all the time when dealing with functions;
-Passing by value
-Passing by reference
JS does not have 'Passing by reference' only 'Passing by value'🥱


// FiRST-CLASS AND HIGHER-ORDER  FUNCTIONS

//FUNCTIONS ACCEPTING CALLBACK FUNCTIONS
const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function(str){
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
};

//Higher-Order Function
const transformer = function (str, fn) {
    console.log(`Original  string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);
    console.log(`Transformed by: ${fn.name}`);
    //.name method returns the name of the function its calling
}

transformer('JavaScript is the best!', upperFirstWord)
transformer('JavaScript is the best!', oneWord);



//SAME AS THE ABOVE
//JS uses callbacks all the time
const high5 = () => {
    console.log('👋');
}

document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);
//For each of the elements in the array the callback was called 



//Functions Returning Functions
// this basically like having a function inside another function
const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    }

}
//this wont work unless it is stored in a variable. remember that the return function does not have a name. 
// greet(`Hey`);

//the return function is stored here. the greeterHey is now a function-the return function
const greeterHey = greet(`Hey`); //the greet function
greeterHey('Jonas'); //the return function
greeterHey('Steven'); //the return function
//this worked  because of something called CLOSURE

//An easier way of doing the above. You'd still get same result. I prefer this😏
greet('Hello')('Jonas');

//Challenge
//Rewriting greet function using arrow function
const greeet = (greeting) => {
    return function (name) {
        console.log(`${greeting} ${name}😊`);
            }
}

greeet(`Hey`)(`Jonas`);
//shorter way
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('HI')('JONAS')


const person = function (name) {
    return function (gender) {
        console.log(`${name} is a ${gender}.`);
    }
}

person(`Jane`)('girl');
person(`Toby`)('boy');
person(`Austine`)('child');
person(`Georgia`)('woman'); 

//The call and apply methods
const lufthansa ={
airline: 'Luftansa',
iataCode: 'LH',
bookings: [],
//book: function{}
//another way of writing functions using the enhanced object literal syntax
book(flightNum, name){
    console.log(
        `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    
    this.bookings.push({
        flight: `${this.iataCode}${flightNum}`, name
    })
}
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'Tiara Smith');
console.log(lufthansa);

const euroWings = {
airline: 'Eurowings',
iataCode: 'EW',
bookings: [],
};

//book method here is no longer that luft... method. It is now a seperate function here👇 It is a copy of the luft.... its no longer a method but an indepenndent regular function on it own. The this keyword if used on it will point to undefined
const book = lufthansa.book;
//book(23, 'Sarah Williams'); //does not work...points to undefined

/*But what if we want to call the function on EW or LH, how do we tell JS manually what the this keyword should look like. There are THREE (3) methods to do that. They are called; call, apply, and bind {these are all METHODS of function}*
//CALL METHOD: To apply this method on either of the 2 objects;
book.call(euroWings, 23, 'Sarah Williams');
console.log(euroWings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
}

book.call(swiss,583, 'Mary Cooper');
console.log(swiss);

//APPLY METHOD: Does exactly the same thing as CALL method, the only diff is that the APPLY does not  receive a list of arguments after the this keyword, insteadd, its going to take an array of the argument
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);
//this apply method is not that used anymore in modern JS, because we now have another way of doing the exact same thing
book.call(swiss, ...flightData); //still same as saying book.call(swiss, 583, 'George Cooper")

//THE BIND METHOD
//The method also allow us to manually set the this keyword for any function call. The diff is that bind does not immiediately call the function, instead it returns a new function where the this keyword is bound-it's set to whatever value we pass into bind.

const bookEW = book.bind(euroWings); //This will not call the book function, instaed it would return a new function where the this keyword alwys be set to euroWings
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams'); //we no longer need to set the this keyword here. Its been done above

const bookEW23 = book.bind(euroWings, 23); //We passed in flightNum parameter here
// const bookEW23 = book.bind(euroWings, 23, 'Jonas');// we could also do this. it would ignore the names called below
bookEW23('Jonas Schmedtmann'); //We passed in name parameter here
bookEW23('Martha Cooper');
//Bind method allows us to set in stone certain arguments, and the resulting function becomes simpler. Above we used the bind method to specify part of the argument beforehand....this is called partial application. PARTIAL APPLICATION simply means that a part of the arugument of the original function are already set

//Other situations to use the bind method;
//When we use objects together with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {

    console.log(this);
    this.planes++; //NO of  plane increases each time the btn is clicked
    console.log(this.planes);
};
// lufthansa.buyPlane();
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
//the this keyword is pointing to the button, so it wont perform the function we want it. In order for it to point to the lufthansa obj, we need to manually define the this keyword inside lufthansa.buyPlane in the addEventListener. We would pass in a function on lufthansa.buyPlane but not call it...we use bind for it; lufthansa.buyPlane.bind(lufthansa)

//PARTIAL APPLICATION means that we can preset parameters
const addTax = (rate, value) => value + value * rate; //general function for adding tax
console.log( addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); //we dont care about the this keyword here so we use null. We could still use addTax
// addVAT = value => value + value * 0.23; (same as above)

console.log(addVAT(100));
console.log(addVAT(23));

// function returner(rate) {
    
//     return function(value){
//       console.log(value + value * rate); 
//     }
// };

// returner(0.1)(100)   OR
function addTaxRate (rate){
    return function (value) {
        return value + value * rate;
    };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23)); */


// Coding Challenge #1
/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*

const poll = {
   question: 'What is your favourite programming language?',
   options: [`0: JavaScript`, `1: Phython`, `2: Rust`, `3: C++`],
   answers: new Array(4).fill(0),

    registerNewAnswer(){
        //Get the answer
const answer = Number(
    prompt(`${this.question}\n${this.options.join('\n')});\n(Write option number)`)
);

console.log(answer);
// typeof answer === 'number' && answer < this.answers.length && this.answers[answer]++;

 //Register Answer
if (typeof answer === 'number' && answer < this.answers.length) {
    this.answers[answer]++

    this.displayResults();
    this.displayResults('string');
}
        },
       
        //displayResults
        displayResults(type = 'array'){
            if (type === 'array') {
                console.log(this.answers);
            }else if (type === 'string') {
                console.log(`Poll Results are ${this.answers.join(', ')}`);
            }
        }
       


    
};

// poll.registerNewAnswer();
document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({answers: [5, 2, 3]},'string')


// BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]
*/


// //IMMEDIATELY INVOKED FUNCTION EXPRESSIONS(IIFE)
// //These are functions that disappear after they have been called once
// const runOnce = function () {
//     console.log('This will never run again');
// };
// runOnce();
 
// //WAYS OF WRITING IIFE
// (function (){
//     console.log('This will never run again');
// })();
// //also works for  arrow functions
// (() => console.log('This also wil never run again'))();


/* 
// CLOSURES
//They are not something we create,,it happens auutomatically and we just have to recognise it
//We can simply say that a closure makes a function remember all the variables that existed in the functions birthplace
const secureBooking = function () {
    let passengerCount = 0;

    return function () {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    }
}


// secureBooking()();

const booker = secureBooking();
booker();
booker();
booker();
booker();
// secureBooking()();
//Secret of closures: any function always have access to the variable environment of the execution context in which the function was created

//In the case of booker, the function was born in the execution context(EC) of secureBooking which was popped off the stack prev. Therefore, the EC will  get access to the variable environment which contains the passengerCount variable, And this is how the booker will be able to read and manipulate the passengerCount variable. This connection is called CLOSURE. A function always has access to the variable environment(VE) of the EC in which it was created even after that EC is gone.
//The closure is basically the VE attached too the function, exactly as it was at the time and place the function was created  
console.dir(booker);
*/


//MORE ON CLOSURES
let f;

const g = function () {
    const a = 23;
    f = function () {
        console.log(a * 2);
    };
};
const h = function () {
    const b = 777;
    f = function () {
        console.log(b * 2);
    }
}


g();
f();

//Re-assigning f function
h();
f(); //closed over the VE of h
console.dir(f)












































// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

/*
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
*/































































































































































