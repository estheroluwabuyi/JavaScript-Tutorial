'use script';
//CONSTRUCTOR FUNCTIONS AND THE NEW OPERATOR
//We can use constructor function to build an object using a function. A constructor function is a completely normal function. The only diff btw a constructor function and a regular function is that we call the constructor function with the new operator. We should constructor functions with capital letters. We can use the function expression and function statement for constructor functions. But the arrow function wont work because it does not have its own this keyword and we need that. 

// const Person = function (fullName, birthYear) {
//     //filling the empty object;
//     //value name must be the exact same as the param passed. Tho, prop names can be diff..we could use any name as the prop name
//     //instance properties
//     this.fullName = fullName;
//     this.birthYear = birthYear;

//     //never create a method inside of a constructor function
//     //adding methods
//     // this.calcAge = function () {
//     //     console.log(2024 - this.birthYear);
//     // }
// }

// const jonas = new Person('Jonas', 1991);
// console.log(jonas);


// //what happens when we call a regular function with the new operator?
// // BTS these happen 4 steps;
// //1. A new empty obj {} is created
// //2. The function is called and the this keyword would be set to the newly created obj. The this keyword would point too the obj that ws created in step 1
// //3. Newly created obj{} is linked to a prototype
// //4. The obj{} created at the beginning is then automatically returned from the constructor function. The function automatically returns that empty object from the beginning.at this point the obj does not have to be empty

// //We can use this constructor function to create as many diff objs as we want
// const matilda = new Person('Matilda', 2017);
// const jaccques = new Person('Jaccques', 1954);
// console.log(matilda, jaccques);

// //we can now say jonas, matilda and jaccques are instances of Person

// //To test if the objs are instances of  the Person constructor function

// console.log(jonas instanceof Person);// this will return true or false
// const jay = 'Jay';
// console.log(jay instanceof Person);

// //constructor function are not a feature of the js language but  a pattern developed by other developers

// //PROTOTYPES
// console.log(Person.prototype);

// Person.prototype.calcAge = function () {
//     console.log(2024 - this.birthYear);
    
// }

// jonas.calcAge();
// matilda.calcAge();

// console.log(jonas.__proto__);
// console.log(jonas.__proto__ === Person.prototype);

// //Person.prototype is the prototype of jonas and matilda
// console.log(Person.prototype.isPrototypeOf(jonas));
// console.log(Person.prototype.isPrototypeOf(matilda));
// console.log(Person.prototype.isPrototypeOf(Person));

// //Person.prototype IS NOT the Person prototype. its the prototype of the linked objs

// //setting props on prototypes
// Person.prototype.species = 'Homo Sapiens'
// console.log(jonas, matilda, jaccques);1
// //this newly declared prop 'species' is not a property of the objs linked to it but of the prototype itself. those objs only have access to it,

// console.log(jonas.hasOwnProperty('fullName'));
// console.log(jonas.hasOwnProperty('species'));

// // Prototypal Inheritance and the Prototype Chain
// // jonas.age = 55;
// // console.log(jonas); //adding more props to jonas obj directly
// console.log(jonas.__proto__); //points to Person
// console.log(jonas.__proto__.__proto__);// Person to obj
// console.log(jonas.__proto__.__proto__.__proto__); //]obj points to null..object has no prototype of its own
// //object.Prototype = top of prototype chain

// //PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS
// //to get function itself
// console.log(Person.prototype.constructor);
// //to inspect function
// console.dir(Person.prototype.constructor);

// //any function is also an obj so of course it has its prototype
// const arr = [3, 6, 4, 5, 6, 9, 6, 9, 3];  //new Array === []
// console.log(arr.__proto__); //prototype of this is Array and the prototype of Array is  object

// //All the arrays get access to all of this methods. Each of the arrays don't contain all of the methods but they'd inherit it from their prototype
// console.log(arr.__proto__ === Array.prototype);
// console.log(arr.__proto__.__proto__);

// //the prototype prop of the constructor 'Array.prototype' is going to be the prototype of all the objects created by that constructor


// // const a = new Array (28999, 66777, 'hhc');
// // console.log(a);
// // console.log(arr);

// //adding new method to the prototype prop of the array constructor, therefore arrays called with the unique() will inherit the method
// Array.prototype.unique = function () {
//    return [...new Set(this)]
// };

// console.log(arr.unique());

// //We just extended. Extending the prototype of an array is generally not a good idea. If you're working on a small project of your own , y0u can use it

// const h1 = document.querySelector('h1');

// console.dir(x => x + 1);
// //functions are objects too thats why we can call methods on it

// CODE CHALLENGE
/*const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function () {
this.speed +=10;
console.log(`${this.make} is going at ${this.speed}km/h`);
};

Car.prototype.brake = function () {
    this.speed -=5;
    console.log(`${this.make} is going at ${this.speed}km/h`);
 };

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
console.log(bmw, mercedes);

bmw.accelerate();
bmw.brake();
bmw.accelerate();

mercedes.accelerate();
mercedes.brake();
mercedes.accelerate();
*/

//ES6 CLASSES
//class expression
// const PersonCl = class{}

//class declaration
class PersonCl {
    constructor(fullName, birthYear){
        //props for the object
        this.fullName = fullName;
        this.birthYear = birthYear
    }
    //methods will be added to the .prototype property
    calcAge() {
console.log(2024 - this.birthYear);
    }

    get age() {
        return 2024 - this.birthYear
    }

    //set prop that already exist
    set fullName(name){
        console.log(name);

        if (name.includes(' ')) {
            //creating a new var
            this._fullName = name;
        }else{
            alert(`${name} is not a full name!`)
        }
    }
get fullName(){
    return this._fullName
}
};
//when we create a new instance, it is the constructor that is going to be called and it will return a new object and that will  e stored into our instance 'jessica'
const jessica = new PersonCl('Jessica Davies', 1996);
console.log(jessica);
//very nice and convenient
jessica.calcAge();
console.log(jessica.age)

console.log(jessica.__proto__ === PersonCl.prototype);

// we can also add methods manually(from outside) to the prototype
PersonCl.prototype.greet = function () {
console.log(`Hey, ${this.fullName}`);
};
jessica.greet();

//1. Classes are not hoisted(we cant use them before they are declared)..function declarations are hoisted
//2. Classes are also first class citizens just like functions...this means that we can pass them into functions and also return them from functions. This is because classes ara really just another kind of function behind the scenes
//3. Classes are executed in strict mode. Even if we did not activate it in our script, all the code that is in the class will be executed in a strict mode

//SETTERS AND GETTERS
const walter = new PersonCl('Walter White', 1965);
const account = {
    owner: 'jonas',
    movements: [200, 530, 120, 300],

    get latest(){
        return this.movements.slice(-1).pop();
    },

    //any setter method needs to have exactly one parameter
    set latest(mov){
this.movements.push(mov)
    }
};

//we don't call the get method, we write it as its just a prop
console.log(account.latest);
//it is not mandatory to specify a setter when we have a getter prop

//using the setter
account.latest = 50;
console.log(account.movements);
//a getter is just like any regular method we set on a prototype

//setters and getters can be useful for data validation

//STATIC METHODS
