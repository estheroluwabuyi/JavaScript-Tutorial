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
person(`Georgia`)('woman'); */

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

/*But what if we want to call the function on EW or LH, how do we tell JS manually what the this keyword should look like. There are THREE (3) methods to do that. They are called; call, apply, and bind {these are all METHODS of function}*/
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