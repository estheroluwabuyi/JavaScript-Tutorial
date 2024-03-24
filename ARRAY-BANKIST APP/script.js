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
*/

//The forEach method
const  movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


