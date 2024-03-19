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
*/

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