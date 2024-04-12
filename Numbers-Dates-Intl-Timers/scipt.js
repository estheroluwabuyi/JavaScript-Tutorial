'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
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
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

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

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

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

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
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
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
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
*/

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