'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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


const displayMovements = function (movements, sort = false) {

  //empty containerMovements container before adding new element
  containerMovements.innerHTML = ''; //empties the container

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;


 movs.forEach(function(mov, i) {

const type = mov > 0 ? 'deposit' : 'withdrawal';

   const html = `
   <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}
          </div>
          <div class="movements__value">${mov}€</div>
        </div>
   `
   containerMovements.insertAdjacentHTML("afterbegin", html);

   // console.log(containerMovements.innerHTML); //you'd see all of the html you have created

 /* <div class="movements__row">
<div class="movements__type movements__type--deposit">2 deposit</div>
<div class="movements__date">3 days ago</div>
<div class="movements__value">4 000€</div>
</div>
 */
  });
};


//Using the reduce method to calculate and print the sum of the balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((accu, mov) => accu + mov, 0);

  labelBalance.textContent = `${acc.balance}€`;
};



//Calculating Stats
const calcDisplaySummary = function(acc){
const incomes = acc.movements
.filter(mov => mov > 0)
.reduce((acc, mov) => acc + mov, 0);
labelSumIn.textContent = `${incomes}€`

const outgoing = acc.movements
.filter(mov => mov < 0)
.reduce((acc, mov) => acc + mov, 0);
labelSumOut.textContent = `${Math.abs(outgoing)}€`;

const interest =acc.movements
.filter(mov => mov > 0)
.map(deposit => deposit * acc.interestRate / 100)
.filter((int, i, arr) => {
  //console.log(arr);
  return int >= 1;
  //only the filtered ints here will make it to the .reduce
})
.reduce((acc, int) => acc + int, 0);
labelSumInterest.textContent = `${interest}€`
};



//Computing UserName
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  })
};

createUsernames(accounts);
// //THE FIND METHOD
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// //USING THE FOROF LOOP TO ACHIEVE SAME THING
// for (const account of accounts) {
//   if (account.owner === 'Jessica Davis') {
//     console.log(account);
//   }
// };

const updateUI = function(acc) {
    //Display movements
displayMovements(acc.movements);

//Display balance
calcDisplayBalance(acc);

//Display Summary
calcDisplaySummary(acc)
};


//EVENT HANDLERS
let currentAcc;
btnLogin.addEventListener('click', function (e) {
  //Prevent Form From Submitting
  e.preventDefault();
 
  currentAcc = accounts.find(acc => acc.username === inputLoginUsername.value);
  //console.log(currentAcc);

  if (currentAcc?.pin === Number(inputLoginPin.value)) {
    //Display UI and welcome message
labelWelcome.textContent = `Welcome back, ${currentAcc.owner.split(' ')[0]}`;
//Split currentAcc.owner value then take the first letter of the returned splited array

containerApp.style.opacity = 100;

//clearing input field
inputLoginUsername.value = inputLoginPin.value = '';
inputLoginPin.blur();
/*
same as;
inputLoginUsername.value = '';
inputLoginPin.value = '';
The above works because operator works from right to left; from ['' =] to [= inputLoginUsernamevalue]
*/ 

//Update UI
updateUI(currentAcc)
  }
});

//IMPLEMENTING TRANSFERS
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find( acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  console.log(amount, receiverAcc);
  if(amount > 0 && 
   receiverAcc && 
    currentAcc.balance >= amount && 
    receiverAcc?.username !== currentAcc.username){

      //Doing the transfer
currentAcc.movements.push(-amount);
receiverAcc.movements.push(amount);

//Update UI
updateUI(currentAcc)
  }
});


//Using the some method to implement the request loan btn
btnLoan.addEventListener('click', function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAcc.movements.some(mov => mov >= amount * 0.1)) {
    //same as  amount /10
    // console.log(currentAcc.movements);
    //add movement
currentAcc.movements.push(amount);
    //update UI
    updateUI(currentAcc);
  }
  inputLoanAmount.value = '';
})


//THE FINDINDEX METHOD
btnClose.addEventListener('click', function (e){
e.preventDefault();
console.log('Delete');

if (inputCloseUsername.value === currentAcc.username && Number(inputClosePin.value) === currentAcc.pin) {
  
const index = accounts.findIndex(acc => acc.username === currentAcc.username);
//Delete Account
  accounts.splice(index, 1);
  console.log(index);
  //Hide UI
  containerApp.style.opacity = 0;
  console.log(accounts);
  //findIndex is slightly same as the .indexOf(arrValue) method. The big diff is that we can only search for the value that is in the array using the index of e.g .indexOf(23); if the array contains a 23 the its true, if not, then its false
};

inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
//IMPLEMENTING SORT BTN
btnSort.addEventListener('click', function(e) {
e.preventDefault();
displayMovements(currentAcc.movements, !sorted);
sorted = !sorted;
});

//Array.from method
//We can also use the Array.from on nodeList(what we get when we use query.selectAll on an element)
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('€', '')));

  console.log(movementsUI);

//movementsUI2 = [...document.querySelectorAll('.movements__value')];
//The above also creates a new array, but we will have to do the mapping separately
});
//We used the Array.from method to create an array from the result of the querySelectorAll, which a nodeList (not really an array, but an array like structure). We then included a mapping method which then transforms the initial array to an array exactly as we wanted

//There,s however another way of converting the nodeList into an array. We use the spread operator

























// console.log(account4.movements.every(mov => mov > 0));
//we  got true in our cl because every value in our account4 is greater than 0

/*
//THE FLAT METHOD to calc the total amount of movements
//flat and flatMap method
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat());
console.log(arrDeep.flat(2));

const overallBalance = 
accounts
.map(acc => acc.movements)
.flat()
.reduce((accu, mov) => accu + mov, 0);
console.log(overallBalance);

//flatMap combines the map and the flat method
const overallBalances =
 accounts
.flatMap(acc => acc.movements)
.reduce((accu, mov) => accu + mov, 0);
console.log(overallBalance); */