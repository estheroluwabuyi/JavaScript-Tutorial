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
    //instance method
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


//static method
static hey(){
    console.log('Hey There👋');
    console.log(this);
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

const Person = function (fullName, birthYear) {
    //filling the empty object;
    //value name must be the exact same as the param passed. Tho, prop names can be diff..we could use any name as the prop name
    //instance properties
    this.fullName = fullName;
    this.birthYear = birthYear;

    //never create a method inside of a constructor function
    //adding methods
    // this.calcAge = function () {
    //     console.log(2024 - this.birthYear);
    // }
}

const jonas = new Person('Jonas', 1991);
console.log(jonas);

Person.hey = function () {
    console.log('Hey There👋');
    console.log(this);
};

Person.hey();

//for class. We would simply add the method inside the class syntax
PersonCl.hey();


//OBJECT.CREATE
const PersonProto = {
    calcAge(){
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear =  birthYear;
    }
}

const steven = Object.create(PersonProto);
//returns a new object that is linked to the prototype that we  passed in here. Steve , an empty object will be linked to the PersonProto object
console.log(steven);

steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven);
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1992);
sarah.calcAge();
//init function will now point to sarah, it does so because we explicitly called init on sarah


//CODE CHALLENGE
class CarCl{
    constructor(make, speed){
        this.make = make;
        this.speed = speed;
    }

    accelerate(){
        this.speed +=10;
        console.log(`${this.make} is going at ${this.speed}km/h`);
        };
        
        brake(){
            this.speed -=5;
            console.log(`${this.make} is going at ${this.speed}km/h`);
         };
        
    get speedUS(){
    // this.speed/=1.6;
    // return `${this.make} is going at ${this.speed} mi/h`;
    return this.speed /1.6
    }

    set speedUS(s){
        this.speed = s * 1.6
    }
}

const ford = new CarCl('Ford', 120);
console.log(ford);
console.log(ford.speedUS);
ford.accelerate();
ford.brake();
ford.speedUS = 50;
console.log(ford);


//INHERITANCE BTW "CLASSES": CONSTRUCTOR FUNCTIONS
//classes here means var name
//parent child
const Person = function (firstName, birthYear) {
  
    this.firstName = firstName;
    this.birthYear = birthYear;

   Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
   }
}

//child class
const Student = function(firstName, birthYear, course){
    //call method calls a function and sets the this keyword inside it bcos this keyword on a regular functions results to undefine
    Person.call(this, firstName, birthYear)
    // this.firstName = firstName; //to avoid repetition
    // this.birthYear = birthYear;
    this.course = course;
};


//LINKING PROTOTYPES
//with this, the Student.prototype object is now an object that inherits from the Person.prototype object.
//We have to create this connection here👇👇 before we add any methods to the prototype object of Student. And thats because object.create will return an empty object..at this point Student.prototype is empty..on the empty object we can add methods. If we had written the `Student.prototype = Object.create(Person.prototype);` after the methods, Object.create would override the method/s its written after
Student.prototype = Object.create(Person.prototype);


Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName}, and I study ${this.course}`);
}

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge(); //despite calcAge not being inside the Student prototype, we were still able to access it from the Person prototype because of the prototype chain 

//the whole idea of inheritance is that child classes can share the behavior from their parent classes
//What we basically want to do now is to set the prototype of Student to the Person prototype
//To link these 2 prototype objects, we are going to use Object.create, because defining prototypes manually is exactly what object.create does
//CLASS INHERITANCE WORKS THE SAME IN ES6 CLASSES TOO. ALL THAT CHANGES IS THE SYNTAX
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student); //true
console.log(mike instanceof Person); //true
console.log(mike instanceof Object); //true


Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
*/


const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed}km/h`);
};

Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed}km/h`);
};




const EV = function (make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
};

//LINK PROTOTYPE
//sets EV prototype to car prototype
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
    this.speed+=20;
    // this.charge-=1
    this.charge--;
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}`);
}

const tesla = new EV('Tesla', 120, 23);

console.log(tesla);

tesla.chargeBattery(90);
console.log(tesla);
tesla.accelerate(); 
//when there are 2 methods or props with the same same name in the prototype chain, then the first one that appears in the chain is the one thats going  to be used