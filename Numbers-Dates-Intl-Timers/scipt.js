'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Esther Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2024-04-10T18:49:59.371Z',
    '2024-04-13T14:43:26.374Z',
    '2024-04-15T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs((date2 - date1) /(1000 * 60 *60 *24)));

  const daysPassed = calcDaysPassed(new Date(), date);
 // console.log(daysPassed);

if(daysPassed === 0) return 'Today';
if(daysPassed === 1) return 'Yesterday';
if(daysPassed <= 7) return `${daysPassed} days ago`;
else{
//   const day = `${date.getDate()}`.padStart(2, 0);
// const month =`${date.getMonth() + 1}`.padStart(2, 0);
// const year = date.getFullYear();

// return `${day}/${month}/${year}`;

return new Intl.DateTimeFormat(locale).format(date);
}

}

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);

}


const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementDate(date, acc.locale);

    const formatMovementNum = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatMovementNum}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);

};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent =  formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};


const startLogOutTimer = function () {

  //set timer to 5 mins
  let time = 300;

  const ding = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String((time % 60)).padStart(2, 0);


    //in each call, print the remaining time to UI
    labelTimer.textContent = `${min}: ${sec}`;

    //each time the above commands has finished running, then the timer-- runs. First the timer was 120, then after one sec that 120 has been divided by 60 which remainder is 0, the timer-- executes by subtracting 1 from from 120 which is 119. 199 divided by 60 is 1 remainder 59...then it continues decreasing..118 % 60 = 58, 117 % 60 = 57...
    
  //when 0 sec, stop timer and log out user
  if (time === 0) {
    clearInterval(timer);
    labelWelcome.textContent = `Log in to get started`;
    containerApp.style.opacity = 0;
    
  };

  //decrease 1 sec
  time--;

  }

  //calls function immediately
  ding();
  //call timer every sec
  const timer = setInterval(ding, 1000)
return timer;
};



///////////////////////////////////////
// Event handlers
let currentAccount, timer;

//FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;


btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    


//Setting current time and date to the labelDate
// const now = new Date();
// //const date = `${now.getDate()}`.padStart(2, 0);
// //this would work too. so basically if the date length is more than 2, the padstart would not work
// const date = `${now.getDate()}`.padStart(2, 0);
// const month =`${now.getMonth()}`.padStart(2, 0);
// const year = now.getFullYear();
// const hours =`${now.getHours()}`.padStart(2, 0);
// const min = `${now.getMinutes()}`.padStart(2, 0);
// labelDate.textContent = `${date < 10 ? '0'+ date : date}/0${month + 1}/${year}, ${hours}:${min}`;


//CREATE CURRENT TIME AND DATE W/ API
const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  //month: '2-digit',
//  month: 'long',
 year: 'numeric',
//  weekday: 'long'
// weekday: 'short'
//weekday: 'narrow' //we'd get only the first letter of the week
 // year: '2-digit' //will get 24 instead of 2024
}

// const locale = navigator.language;
// console.log(locale);

labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);



    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Timer
    if (timer) clearInterval(timer)
    timer = startLogOutTimer();
    
    // Update UI
    updateUI(currentAccount);

  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //ADD TRANSFER DATE
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString())

    // Update UI
    updateUI(currentAccount);

    //Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
   setTimeout(function (){ // Add movement
    currentAccount.movements.push(amount);

    //ADD LOAN DATE
    currentAccount.movementsDates.push(new Date().toISOString())

    // Update UI
    updateUI(currentAccount);
  //Reset Timer
  clearInterval(timer);
  timer = startLogOutTimer();

  }, 2500);
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
   +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
//IMPLEMENTING SORT BTN
btnSort.addEventListener('click', function(e) {
e.preventDefault();
displayMovements(currentAcc.movements, !sorted);
sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
//CONVERTING AND CHECKING NUMBERS
//In JS, all nums are represented internally as floating point nums...that is as decimals, no matter how we write them...that is why we have one data type for all numbers. Numbers in JS are represented internally in 1 64 base 2 format, that means that nums are always stored binary format...they are only composed with 0s and 1s.
//Base 10 = 0 to 9
//Binary Base 2 = 0 and 1
console.log(23 === 23.0);
//However, there are certain nums that are difficult represent in base 2. E.g;
console.log(0.1 + 0.2);
 //the answer should be 0.3 but JS has no better way of representing this number.JS cannot represent certain fraction behind the scene(BTS) //php and ruby also use this system

 //Converting strings to numbers
 console.log(Number('23'));
 console.log(+'23'); //better way of converting strings to nums

 //PARSING NUMBERS FROM STRINGS
 //Number.parseInt: works on integer
//this Number method tries to get rid of unnecessary symbols that are not nums. It wont work if the symbol(s) is before the num
 console.log(Number.parseInt('30px',10)); //wed get 30 in cl
 console.log(Number.parseInt('e23',10)); //wed get NaN in cl
 //the parseInt function also accepts a second argument called regex. Regex(or redex) is the base of the numeral system that we are using--in this case, we are simply using base 10 numbers(nums from 0 to 9). if we are using the base 2 numbers, wed simply pass 2 as the second argument. Notice that even when we did not pass in the second argument, it still worked, it is better to pass in the second argument to avoid errors

 //Number.parseFloat:
 //performs same function as parse.Int, but only decimals numbers
 console.log(Number.parseFloat('2.5rem'));
 //console.log(parseFloat('2.5rem')); //would work but not encouraged
 console.log(Number.parseInt('2.5rem')); //only read the num b4 the decimal point

 //Use only to check if value is NaN
 //isNaN(is not a number): checks if value is not a num-returns a boolean
 console.log(Number.isNaN(23));
 console.log(Number.isNaN('23')); //we'd false 23 is also not a num
 console.log(Number.isNaN(+'23X'));
 //isFinite is however the best way of checking if a value is a number or not

//  Use to check if value is a number
 //isFinite: does the opp of the isNaN
 console.log(Number.isFinite(23)); //it is a num and its finite
 console.log(Number.isFinite('23')); //not a number
 console.log(Number.isFinite(+'23X'));//not a number
 console.log(Number.isFinite(23 / 0)); //this is finite so wed get false

 //isInteger: checks if value is integer
 console.log(Number.isInteger(23.5));
 console.log(Number.isInteger(23));
 console.log(Number.isInteger(23.0));
 console.log(Number.isInteger(23/0)); 

 //MATH AND ROUNDING
 //SQUARE ROOT
console.log(Math.sqrt(25));
console.log(25 ** (1/2)); //use this to also get the square root
//To calculate a cube root;
console.log(8 **(1/3));

//MAXIMUM VALUES
console.log(Math.max(4, 18, 23, 40,21,12));
console.log(Math.max(4, 18, 23, '40',21,12)); //does type coercion
console.log(Math.max(4, 18, 23, '40px',21,12)); //does not parse values

//MINIMUM VALUES
console.log(Math.min(4, 18, 23, 40,21,12)); //gets minimum value

//MATH PI
//To get the PI of a circle
console.log(Math.PI);
//to calc the area of a circle 
console.log(Math.PI* Number.parseFloat('10px') **2);

//MATH.RANDOM
//Typically gives numbers btw 0 and 1
console.log(Math.random());
console.log(Math.trunc(Math.random() * 6) + 1);
//without the +1, we would get num btw 0 and 5 but with it, we get nums btw 1 and 6

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

//ROUNDING INTEGERS
//All  these methods do type coercion
//Math.trunc..removes decimal parts
console.log(Math.trunc(23.3)); //23

//Math.round..rounds to the nearest integers
console.log(Math.round(23.3)); //23
console.log(Math.round(23.7));//24

//Math.ceil..rounds up nums
console.log(Math.ceil(23.3));//24
console.log(Math.ceil(23.7)); //24

//Math.floor..rounds down nums
console.log(Math.floor(23.3)); //23
console.log(Math.floor(23.7)); //23

//Trunc and Floor dealing with negative numbers
console.log(Math.trunc(-23.3)); //23
console.log(Math.floor(-23.3)); //24..does the opp of flooring and rounds up

//ROUNDING DECIMALS
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));


//THE REMAINDER OPERATOR
console.log(5 % 2); //5 / 2 = 2 remainder 1 //2 * 2 + 1 = 5
console.log(6 % 4); //remainder = 2 (6 divided by 4 = 1 remainder 2)
console.log(6 % 2); // 6 /2 = 3 remainder 0
console.log(100 % 11);// 100 / 11 = 9 remainder 1
console.log(8 % 3); // 2 rem 2

const isEven = n => n % 2 === 0;
console.log(isEven(43));
console.log(isEven(80));
console.log(isEven(790));


labelBalance.addEventListener('click', () =>{
[...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
  if (i % 2 === 0) row.style.backgroundColor = 'orangered';
  if (i % 3 === 0) row.style.backgroundColor = 'pink';
  
});

});

//NUMERIC OPERATOR (ES6)
const diameter = 287_460_000_000;
console.log(diameter);

const priceCents  = 345_99;
console.log(priceCents);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

console.log(+ '230000');
console.log(+ '230_000'); //NaN


//BIG INT
//Primitive. Special integer introduced in ES2020\
console.log(6456789709977643448532447890766n);
console.log(BigInt(6456789709));
console.log(6456789709977643448532447890766n *344444n);

console.log(20 > 15);
console.log(typeof 20n);
console.log(20n === 20);
console.log(20n == 20);

console.log(20n / 6n); //cuts off the decimal parts
console.log(20 / 6); */
/*
//CREATING DATES
//4 ways of creating dates im JS;
//(1)
const now = new Date();
console.log(now);

//(2)
console.log(new Date('Apr 14 2024 19:22:26'));
console.log(new Date('Dec 24, 2014'));
console.log(new Date(account1.movementsDates[0]));

//(3)
console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 32)); //JS autocorrects dates

//(4)
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); 
//WORKING WITH DATES
const future = new Date(2037, 10, 19, 15, 23);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
// console.log(future.getMilliseconds());
console.log(future.toISOString());
console.log(future.getTime());

console.log(new Date(2142253380000));
//getting the date based on the milliseconds that have passed since 1970


//To get current time stamp
console.log(Date.now());

// const now = new Date();
// console.log(now.getTime());

//Getting Dates using Set method
future.setFullYear(2040)
//changes the year. Also performs auto correction. We can use the set method to get basically whatever date method we want too get
console.log(future);

//WORKING WITH DATES
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcDaysPassed = (date1, date2) => Math.abs((date2 - date1) /(1000 * 60 *60 *24));

const days1 = calcDaysPassed(new Date(2037, 3, 14),new Date(2037, 3, 24) );
console.log(days1); 

//INTERNATIONALIZING NUMBERS
const options = {
  style: 'currency',
  currency: 'EUR',
  //we do need to define the currency manually because it is not determined by the locale
  // useGrouping: false,
  //would remove commas or decimals from numbers(remove grouping)
  //unit completely ignored when using currency or percent
  // style: 'percent',
  // style: 'unit',
  //unit: 'mile-per-hour'
  unit: 'celsius'
}

//Most Basic Formatting
const num = 3884764.23;
console.log('Britain: ',new Intl.NumberFormat('en-GB', options).format(num));
//this API makes it easy to read nums with separators...based on what the country we passed in uses
console.log('Germany: ',new Intl.NumberFormat('de-DE', options).format(num));
//comma for decimals and dots for separators in germany:  3.884.764,23
console.log('Syria:    ',new Intl.NumberFormat('ar-SY', options).format(num));
console.log(navigator.language,new Intl.NumberFormat(navigator.language, options).format(num));  
*/

//TIMERS: SETTIMEOUT AND SETINTERVAL
setTimeout(() => console.log(`This is your pizza 🍕`), 3000);

setTimeout(
  (ing1, ing2) =>
   console.log(`This is your pizza with ${ing1} and ${ing2}🍕`), 
   3000,
  'olives',
  'spinach'
);

console.log('Waiting...');

//Cancelling settTimeOut before execution
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout((ing1, ing2) => {
 console.log(`Here is your pizza with ${ing1} and ${ing2}🍕`); 
}, 3000, ...ingredients);

if (ingredients.includes('spinach')) {
  clearTimeout(pizzaTimer);
}

//SETINTERVAL
// setInterval(function(){
//   const now = new Date();
//   console.log(now);
// }, 1000);

setInterval(() => {
  const now = new Date();
  const hour = now.getHours();
 const min = now.getMinutes();
 const sec = now.getSeconds();
 console.log(`${hour}:${min}:${sec}`);
}, 1000);
