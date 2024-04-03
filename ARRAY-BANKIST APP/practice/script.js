
'Use strict';
/*
//Simple Array Methods
let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE method
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(-2)); //This started extraction from position 1 and excluded the last 2 indexes
console.log(arr.slice(0, -3));
//using slice method to create shallow copy of array;
//We simply call the method without passing in any argumnets in it
console.log(arr.slice());

//SPLICE method
//Works almost the same way as the slice method, but the fundamental diff is that it actually changes the original array..it mutates the array
// console.log(arr.splice(2));
//console.log(arr); //Splice deleted the parts extracted from the original array

//Splice method is mostly used to  delete last indexes...we are not usually concerned with the returned array
arr.splice(-1);
console.log(arr);
arr.splice(1,2)
console.log(arr);

//REVERSE method
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//CONCAT method
const letters = arr.concat(arr2);
// const letters = arr.concat(arr);
// const letters = arr2.concat(arr);
console.log(letters);
console.log([...arr, ...arr2]); //Spread Operator..we'll get same result as concat

//JOIN method
console.log(letters.join(' + ')); 

//SORT method
//used to sort the elements of an array in place and returns the sorted array. By default, it sorts the array alphabetically/lexicographically when applied to strings or numerically when applied to numbers
const fruits = ['banana', 'apple', 'orange', 'grape'];
fruits.sort();
console.log(fruits);// output: ['apple', 'banana', 'grape', 'orange']

//THE NEW AT METHOD ES22
const arrr = [23, 11, 64];
//instead of;
console.log(arrr[0]);
//we do this 
console.log(arrr.at(0));

//This method may not seem useful but lets  say we want to getthe last index of an array and we dont know the position, typically we'd say;
console.log(arrr[arrr.length-1]); //the length is 3 but array is zero based so we'd have to minus 1 from the length to get 64 which is the last element
//we can also use the slice method to get the last element
console.log(arrr.slice(-1)[0]);//this way, we'd get the last index value

//But with the new method, it's easier;
console.log(arrr.at(-1)); //we'd get the last index
console.log(arrr.at(-2));
//at method is often good for getting the last index of an array and it is perfect for method chaining
//The at method also works on strings;
console.log('jonas'.at(0));
console.log('jonas'.at(-1));


//Looping Arrays: The forEach method
//forof method
const  movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
for (const movement of movements) {
    if (movement > 0) {
        console.log(`You deposited ${movement}`);
    }else{
        console.log(`You withdrew ${Math.abs(movement)}`);
    }
}


console.log('-------FOREACH METHOD---------');
//forEach method
movements.forEach(function (movement) {
    if (movement > 0) {
        console.log(`You deposited ${movement}`);
    }else{
        console.log(`You withdrew ${Math.abs(movement)}`);
    } 
});

//Accessing counter varaiable...accessing currnt index in forof loop
//In the forof we'd say;
for (const [i,movement] of movements.entries()) {
    if (movement > 0) {
        console.log(`Movement ${i + 1}: You deposited ${movement}`);
    }else{
        console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
    }
};


console.log('-------FOREACH METHOD---------');
//in foreach we'd say
movements.forEach(function(mov, i, arr) {
    if (mov > 0) {
        console.log(`Movement ${i + 1}: You deposited ${mov}`);
    }else{
        console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
    }
}); 

//FOREACH WITH MAPS AND SETS
//MAP
const currencies = new Map([
['USD', 'United States dollar'],
['EUR', 'Euro'],
['GBP', 'Pound Sterling']
]);

currencies.forEach(function (value, key, map){
    console.log(`${key}: ${value}`);
});
//where key is the 'key' and value is the 'value'

//SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
    console.log(`${value}: ${value}`);
});*/


// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀

const checkDogs = function (dogsJulia, dogsKate) {
    const dogsJuliaCorrected = dogsJulia.slice();
    dogsJuliaCorrected.splice(0,1);
    dogsJuliaCorrected.splice(-2);

    //dogsJuliaCorrected.splice(1,3);...youd still get same result
   const dogs = dogsJuliaCorrected.concat(dogsKate);
   console.log(dogs);


dogs.forEach(function(dog, i) {
    dog >= 3 ?  console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old.`) : console.log(`Dog number ${i + 1} is a puppy, and is ${dog} years old.`);

// if (dog >= 3) {
//     console.log(`Dog number ${i + 1} is an adult and is ${dog} years old.`);
// } else {
//     console.log(`Dog number ${i + 1} is a puppy and is ${dog} years old.`);  
// }
});

};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log('------------SECOND TEST DATA------------');
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]); 

//DATA TRANSFORMATIONS; MAP, FILTER, REDUCE
//MAP METHOD
const eurToUsd = 1.1;
const  movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const movementsUSD = movements.map(function (mov){
// return mov * eurToUsd;
// // return 23;
// });

//Arrow function
//const movementsUSD = movements.map(mov => Math.trunc(mov * eurToUsd));
const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movements);
console.log(movementsUSD);

//Writing same thing using the forof loop
const movementsUSDfor = [];
for (const mov of movements) {
    movementsUSDfor.push(mov * eurToUsd)
};
console.log(movementsUSDfor);

// for (const mov of movements) {
//     console.log(mov * eurToUsd);
// }

//MAP METHODS ALSO HAVE ACCESS TO THE EXACT SAME 3 PARAM JUST LIKE THE FOREACH METHOD
const movementDescriptions = movements.map(function (mov, i){
    return `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`

    // if (mov > 0) {
    //     return`Movement ${i + 1}: You deposited ${mov}`;
    // }else{
    //     return`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
    // }
});
console.log(movementDescriptions);


//The Filter Method
const  movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(function (mov) {
    return mov > 0;
});
console.log(movements);
console.log(deposits);

const withdrawals = movements.filter(function (mov) {
    return mov < 0;
});
console.log(withdrawals);

//ARROW FUNCTION
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);
*/

//THE REDUCE METHOD
/*The reduce method takes 4 params instead of the normal 3. The first argument is called the accumulator. Second is the current element, third is the index, and the last is the entire array. We can say that the accumulator is like a snowball that keeps getting bigger as it rolled down the hill. Accumulator is the value that we'd keep adding to,
The reduce method also takes in a second argument called the initial value of the accumulator. The value that we specify in the second argument is the initial value of the accumulator in the first loop iteration. In the case above, we want to start adding at zero, so therefore we simply specify zero as the second argument 

const  movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
// const balance = movements.reduce(function(accu, cur, i, arr){
//     console.log(`Iteration ${i}: ${accu}`);
// return accu + cur;
// }, 0);

//ARROW FUNCTION
const balance = movements.reduce((accu, cur) =>
 accu + cur, 0);
console.log(balance);

//Doing the same thing with the FOROF LOOP;
let balance2 = 0;
for (const mov of movements)  balance2 += mov;
console.log(balance2);

//We can use the reduce method method to do other stuff rather than getting the total value
//Getting Max Value
const max = movements.reduce((accu, mov) =>{
if (accu > mov)
return accu;
else
return mov;
}, movements[0]);
console.log(max); */

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀


const calcAverageHumanAge = function (ages) {
   const humanAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4);
   const adults = humanAges.filter(age => age >= 18);
   console.log(humanAges);
   console.log(adults);
   
//    const humanAges = ages.map(function(age) {
//     if (age <= 2) {
//         return 2 * age;
//     } else {
//         return 16 + age * 4;
//     }
// }); 

// const adults = humanAges.filter(function(age) {
//     return age >= 18;
// });

   const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

   return average;

//    const average = adults.reduce(function(acc, age) {
//     return acc + age;
// }, 0) / adults.length;

};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);


//THE MAGIC OF CHAINING METHODS
const eurToUsd = 1.1;
const  movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const totalDepositsToUSD = movements
.filter(function (mov) {
  return mov > 0;
   //return mov < 0;
})
//.map(mov => mov * eurToUsd)
.map((mov, i, arr) => {
  //  console.log(arr)
    return mov * eurToUsd
})
.reduce(function (acc, mov) {
    return acc + mov
}, 0); //Used the traditional and arrow functions together so i can really grasp the way the arrow function works

console.log(totalDepositsToUSD);
//We can only chain a method if the first one returns an array. 

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀



 const  calcAverageHumanAge = ages =>
    ages
    .map(age => age <= 2 ? 2 * age : 16 + age * 4)
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0) 
 
 const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
 const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
 console.log(avg1, avg2); */

//THE FIND METHOD
// const  movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);


//SOME AND EVERY METHODS
//SOME METHOD
const  movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//includes method
console.log(movements.includes(-130)); //checks for equality
//Includes method tests for equality. checks if the value inserted is present in an array. But what if we wanted to test for a condition instead?....that's where the some method come into play

const anyDeposits = movements.some(mov => mov > 0); //checks for condition //true
// const anyDeposits = movements.some(mov => mov > 1500); //true
// const anyDeposits = movements.some(mov => mov > 5000); //false
console.log(anyDeposits);
//So basically, some method returns a boolean (true or false). in this case, we'd get a true in our cl because the movements arr contains values greater than 0
console.log(movements.some(mov => mov === -130)); //true

//EVERY METHOD
//this method is pretty similar to the some method. The diff is that every returns true if ALL of the values in the array satisfies the set condition(if every value passes the test in our call back function, only then will every return true)
console.log(movements.every(mov => mov > 0));//we'd get false in our console because not every values  in the movements array are greater than 0
const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  };
  console.log(account4.movements.every(mov => mov > 0));
//we  got true in our cl because every value in our account4.movements is greater than 0

//Separate Callback
const deposit = mov => mov < 0;
//console.log(movements.map(deposit)); //cl; [true, true, false, true, false, false, true, true]
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));












































///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
