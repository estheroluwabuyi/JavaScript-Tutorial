'use script';
//CONSTRUCTOR FUNCTIONS AND THE NEW OPERATOR
//We can use constructor function to build an object using a function. A constructor function is a completely normal function. The only diff btw a constructor function and a regular function is that we call the constructor function with the new operator. We should constructor functions with capital letters. We can use the function expression and function statement for constructor functions. But the arrow function wont work because it does not have its own this keyword and we need that. 

const Person = function (firstName, birthYear) {
    //filling the empty object;
    //value name must be the exact same as the param passed. Tho, prop names can be diff..we could use any name as the prop name
    //instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    //never create a method inside of a constructor function
    //adding methods
    // this.calcAge = function () {
    //     console.log(2024 - this.birthYear);
    // }
}

const jonas = new Person('Jonas', 1991);
console.log(jonas);


//what happens when we call a regular function with the new operator?
// BTS these happen 4 steps;
//1. A new empty obj {} is created
//2. The function is called and the this keyword would be set to the newly created obj. The this keyword would point too the obj that ws created in step 1
//3. Newly created obj{} is linked to a prototype
//4. The obj{} created at the beginning is then automatically returned from the constructor function. The function automatically returns that empty object from the beginning.at this point the obj does not have to be empty

//We can use this constructor function to create as many diff objs as we want
const matilda = new Person('Matilda', 2017);
const jaccques = new Person('Jaccques', 18244);
console.log(matilda, jaccques);

//we can now say jonas, matilda and jaccques are instances of Person

//To test if the objs are instances of  the Person constructor function

console.log(jonas instanceof Person);// this will return true or false
const jay = 'Jay';
console.log(jay instanceof Person);

//constructor function are not a feature of the js language but  a pattern developed by other developers