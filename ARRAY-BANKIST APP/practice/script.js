
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
//used to sort the elements of an array in place and returns the sorted array. By default, it sorts the array alphabetically/lexicolographically when applied to strings or numerically when applied to numbers
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
console.log(movementDescriptions); */


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