'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//OUR FIRST AJAX CALL: XMLHttpRequest
//In JS, there are multiple ways of doing AJAX calls. We'd start the most old school one called; XMLHttpRequest function.

//Steps for calling an XMLHttpRequest;
//Fist step is to call  XMLHttpRequest with the 'new' keyword and store the result in a new variable
//Next we need the URL to which we'd make the AJAX call. the request.open() takes in 2 arguments First is the type of request, and the type of http request to get data is called 'GET'. Second, we need a string containing the URL to which the AJAX call will actually be made

/*
const getCountryData = function (country) {
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//with this, we basically open the request and next we need to send it
request.send();
//this AJAX call that we just send off here is being done in the BG while the rest of the code keeps running

request.addEventListener('load', function () {
  console.log(this.responseText);

  const [data] = JSON.parse(this.responseText);
  //same as; const data = JSON.parse(this.responseText)[0]; JSON.parse(this.responseText) gives us an array

  console.log(data);

  const html = `
    <article class="country">
          <img class="country__img" src="${data.flags.png}" alt='${data.flags.alt}' />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} million people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
          </div>
        </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
});
};

getCountryData('portugal');
getCountryData('nigeria');
getCountryData('usa');
//The data arrive in diff orders making the containers change positions. This really shows the non-blocking behavior in action
//Each AJAX were fired separately and didn't wait for others to arrive. Whichever data arrives first will fire the load event first and be displayed first
//we cant control which one finish first
*/

//WELCOME TO CALLBACK HELL
//We are going to create a sequence of AJAX calls so that the first one second one runs only after the first one has finished

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" alt='${
    data.flags.alt
  }' />
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} million people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderErr = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);

  countriesContainer.style.opacity = 1;
};

/*
const getCountryAndNeighbour = function (country) {

  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);

    console.log(data);

    // Render country
   renderCountry(data);

   // Get neighbour country
   const neighbour = data.borders?.[0];

  //  if(!neighbour) return;

  // AJAX call country 2
  const request2 = new XMLHttpRequest();
  request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
  request2.send();

  request2.addEventListener('load', function(){
console.log(this.responseText);

const [data2] = JSON.parse(this.responseText);
console.log(data2);

renderCountry(data2, 'neighbour')

  })

  });
};

getCountryAndNeighbour('portugal');
//no matter how much we reload it, portugal will always come before spain because it  is dependent on it
*/

// setTimeout(() => {
//   console.log('1 second passed');

//   setTimeout(() => {
//     console.log('2 second passed');

//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');

//       }, 1000);

//     }, 1000);

//   }, 1000);

// }, 1000);

// PROMISES AND FETCH API
//  const request = new XMLHttpRequest();
//  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//  request.send();

//CONSUMING PROMISES
// const request = fetch('https://restcountries.com/v3.1/name/portugal');
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

//SIMPLIFIED VERSION with arr function
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())

//     .then(data => renderCountry(data[0]));
// };

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())

//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data.borders?.[0];

//       if (!neighbour) return;

//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'));
// };

// getCountryData('portugal');

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders?.[0];
//     console.log(data);

//       if (!neighbour) return;

//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {

//       return response.json();
//     })
//     .then(data => renderCountry(data[0], 'neighbour'));
// };

// btn.addEventListener('click', function () {
// getCountryData('nigeria');
// });

/*
// HANDLING REJECTED PROMISES
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0];
    console.log(data);


      if (!neighbour) return;

      //Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      
      return response.json();
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    // .catch(err => alert(err))- should be inside the then method
    .catch(err => {
      console.log(`${err} 💥💥💥`)
    renderErr(`Something went wrong💥💥💥 ${err.message}. Try again!`);
    //err is an inbuilt js object. it has a message prop
    })
    .finally(() =>{
  countriesContainer.style.opacity = 1;
    })

};

btn.addEventListener('click', function () {
getCountryData('uuii');
});
*/

//THROWING ERRORS MANUALLY
// const getCountryData = function (country) {
//   //country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);

//       // const neighbour = data[0].borders?.[0];
//       const neighbour = 'wonderland';

//       console.log(data);

//       if (!neighbour) return;

//       //Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     // .catch(err => alert(err))- should be inside the then method
//     .catch(err => {
//       console.log(`${err} 💥💥💥`);
//       renderErr(`Something went wrong💥💥💥 ${err.message}. Try again!`);
//       //err is an inbuilt js object. it has a message prop
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

/*
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

//THROWING ERROR MANUALLY
const getCountryData = function (country) {
  //country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}, 'Country not found`)
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0];
      // const neighbour = 'wonderland';

      console.log(data);

      if (!neighbour) throw new Error('no neighbour found!');

      //Country 2
      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, 'Country not found');
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    // .catch(err => alert(err))- should be inside the then method
    .catch(err => {
      console.log(`${err} 💥💥💥`);
      renderErr(`Something went wrong💥💥💥 ${err.message}. Try again!`);
      //err is an inbuilt js object. it has a message prop
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};


btn.addEventListener('click', function () {
  getCountryData('portugal');
});

*/

/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      if (!response.ok) throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0];

      if (!neighbour) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`Neighbour country not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => console.error(`${err.message} 💥`));
};

getCountryData('portugal');
*/

//////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀

//CODE SOLUTION
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?json=1?json`)
  .then(response => {
if (!response.ok) throw new Error(`Problem with geocoding ${response.status}`);
console.log(response);
  return response.json();
  })
  .then(data => {
   console.log(data);

   console.log(`You are in ${data.city}, ${data.country}.`);

   return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
  })
  .then(response => {
          if (!response.ok)
            throw new Error(`Country not found (${response.status})`);
    
          return response.json();
        })
        .then(data =>{ renderCountry(data[0]) 
 } )
  .catch(err => console.log(`${err.message} 💥`))
}

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/

/*
// ASYNCHRONOUS BEHIND THE SCENES: THE EVENT LOOP
//THE EVENT LOOP IN PRACTICE
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0); //4th log
Promise.resolve('Resolved Promise 1').then(res => console.log(res)); 
Promise.resolve('Resolved Promise 2').then(res => { 
  for (let i = 0; i < 5000; i++) { 
    console.log('ress');
  }
  console.log(res);
}); 

console.log('Test end');


// BUILDING A SIMPLE PROMISE
const lotteryPromise = new Promise(function (resolve, reject) {

  console.log('Lottery draw is happening 🔮');

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);

});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
//Promisifying setTimeout:
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000)
  })
};

wait(2).then(() => {
  console.log(`1 second passed`);

  return wait(1);
}).then(() => {
  console.log(`2 second passed`);

  return wait(1);
}).then(() => {
  console.log(`3 second passed`);

  return wait(1);
}).then(() => console.log('4 second passed'));

// The then() will not receive any fulfilled value in our callback because we left the resolved() empty

//Another way to instantly create a fulfilled or rejected promise
Promise.resolve('ABC').then(x => console.log(x));
Promise.reject(new Error('Errorrr!')).catch(x => console.error(x));
*/

//PROMISIFYING THE GEOLOCATION API
// navigator.geolocation.getCurrentPosition(
//   position => resolve(position),
//   err => reject(err)
// );

//Promisifying a Callback based API to a promise based API
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    //   navigator.geolocation.getCurrentPosition(
    //     position => resolve(position),
    //     err => reject(err)
    //   );

  navigator.geolocation.getCurrentPosition(resolve, reject); //same as above
  });

};


// getPosition().then(pos =>  console.log(pos));

// console.log('Getting Position');

const whereAmI = function (lat, lng) {
getPosition().then(pos => {
  const {latitude: lat, longitude: lng} = pos.coords;

  return fetch(`https://geocode.xyz/${lat},${lng}?json=1?json`);
  

})
  .then(response => {
if (!response.ok) throw new Error(`Problem with geocoding ${response.status}`);
console.log(response);
  return response.json();
  })
  .then(data => {
   console.log(data);

   console.log(`You are in ${data.city}, ${data.country}.`);

   return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
  })
  .then(response => {
          if (!response.ok)
            throw new Error(`Country not found (${response.status})`);
    
          return response.json();
        })
        .then(data =>{ renderCountry(data[0]) 
 } )
  .catch(err => console.log(`${err.message} 💥`))
}

btn.addEventListener('click', whereAmI);