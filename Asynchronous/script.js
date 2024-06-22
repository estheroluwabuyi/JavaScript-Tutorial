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

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
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
/*

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
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?json=1?json`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data);

      console.log(`You are in ${data.city}, ${data.country}.`);

      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => console.log(`${err.message} 💥`));
};

btn.addEventListener('click', whereAmI);
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Consume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const newImg = document.createElement('img');
    newImg.src = imgPath;

    newImg.addEventListener('load', () => {
      imgContainer.append(newImg);

      resolve(newImg);
    });

    newImg.addEventListener('error', () => {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(newImg => {
    currentImg = newImg;
    console.log('Image 1 loaded');
   return  wait(2);
  }).then(()=> {
currentImg.style.display = 'none'
return createImage('img/img-2.jpg');
  }).then(newImg => {
    currentImg = newImg;
    console.log('Image 2 loaded');
   return  wait(2);
  }).then(()=> {
    currentImg.style.display = 'none';
      })
  .catch(err => console.log(err));
*/


//CONSUMING PROMISES WITH ASYNC/AWAIT
/*fetch(`https://restcountries.com/v3.1/name/${country}`);
  console.log(res).then(res => console.log(res)); */

//You know this returns a new promise, right? But instead of chaining another then method, we simply use the await statement and store the automatically returned promise of the await in a variable
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    //GeoLocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //Reverse geoCoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?json=1?json`);
    if (!resGeo.ok) throw new Error(`Problem getting country`);
    //this line of code not working on my system because I'm not getting a 404 error for the geoCoding api...just some 'throttled' junk
    const dataGeo = await resGeo.json();

    //Country Data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    const data = await res.json();
    renderCountry(data[0]);

    //Returning Values From Async Function
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
    //however, if any error occurs in the try block, this return will never be reached because the code will immediately jump to the catch block.
  } catch (err) {
    console.log(err);
    renderErr(` 💥 ${err.message}`);

    //Reject Promise returned from async function
    throw err;
  }
};

console.log('1: Will get Location');

// const city = whereAmI();
// console.log(city); //This will return a promise and be displayed in this order..at this point JS has no idea of what will be returned at this point. The fulfilled value of the promise will be this return "You are..." string because that is the value that we returned in the async function

/* 
whereAmI()
  .then(city => console.log(`2: ${city}`))
  .catch(err => console.log(`2: ${err.message} 💥`))
  .finally(() => console.log(`3: Finished getting location`)); 
//This will get the resolved value of the promise..the return 'You are in..' Despite the error  in our try block(async function), this console is still running(though logs undefined). This means that the promise returned by the async func is still fulfilled and not rejected. To catch the error, we have rethrow the error


(async function () {
  try {
  const city = await whereAmI();
  console.log(`2: ${city}`);
  } catch (err) {
    console.log(`2: ${err.message} 💥`)
  }
  console.log(`3: Finished getting location`)
})();

//ERROR HANDLING WITH TRY...CATCH
// try{
//   let y = 1;
//   const x = 2;
//  x = 3;
// }catch(err){
// alert(err.message);
// }
*/

/*
//Running Promises in Parallel
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log(data1.capital, data2.capital, data3.capital);

    //Even though each data did not have any attachment to each other, all of them will still wait until everything has finish loaded before displaying everything (they all run/load in sequence)..does not make lot of sense
    //Promise.all
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital));

  } catch (err) {
    console.log(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');
*/

//Instead of running the promises in sequence, we can run them in parallel..all at the same time, saving valuable loading time, making the 3 load at the same time..each takes half a second, with that, wed basically save 1 second. To do that, we use the promise.all combinator function.
//Promise.all is a helper function on the promise constructor, its a static method. This function takes in an array of promises and it wil return a new promise, which will then run all the promises in the array at the same time. We can the handle the returned promise by like prev by calling the await on it and storing it in a var. Promise.all receives an array and also returns an array. One thing worthy of noting is that, if one of the promisees rejects, the whole promise.all rejects as well. We say promise.all short circuits when one promise rejects. Whenever you need to do multiple async operations at the same time(operations that don't depend on one  another), you should always run them in parallel using promise.all.

/*
//Other Promise Combinators: race, allSettled and any
//Promise.race:
//Just like all other combinators, it receives an array of promises and returns a promise. The promise returned by the promise.race is settled as soon as one of the input promise is settled. And settled means that a value is available, but it doesn't matter if the promise got rejected or fulfilled. In promise.race, the first settled promise wins the race.
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);

  console.log(res[0]);
})();
//All this wil basically race against each other and if the winning promise is fulfilled promise, then the fulfillment value of the whole promise.race is going to be the fulfillment value of the winning promise.  In promise.race, we only get 1 result and an array of the result of  the 3. A promise that gets rejected can also win the race. Promise.race is useful to prevent against never ending an also very long running promises.
//Lets say the users network is slow, we can use the promise.race to reject ones it reaches a certain timeout;
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([getJSON(`https://restcountries.com/v3.1/name/uk`), timeout(0.2)])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

  Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
.then(res => console.log(res))
.catch(err => console.error(err));

// 2. Promise.allSettled
//Pretty new(ES2020) and very simple. It takes in an array of promises and it will simply return an array of all the settled promises. No matter if  the promise got rejected or not. Its similar to promise.all as it also returns an array of all the results. The diff is that promise.all will short circuit as soon as one promise rejects, but promise.allSettled never short circuits. It would simply return all the results of the promises
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
.then(res => console.log(res));

//Promise.any
// Promise(ES2021). It takes in array of multiple promises and then return the first fulfilled promise and would simply ignore rejected promises. The result of promise.any is always going to be a fulfilled promise unless all of them reject. Does not return an array
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
.then(res => console.log(res))
.catch(err => console.error(err));
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const newImg = document.createElement('img');
    newImg.src = imgPath;

    newImg.addEventListener('load', () => {
      imgContainer.append(newImg);

      resolve(newImg);
    });

    newImg.addEventListener('error', () => {
      reject(new Error('Image not found'));
    });
  });
};

//SOLUTION
//PART 1
const loadNPause = async function () {
  try {
    //load image 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
   img.style.display = 'none';

    //load image 2
     img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

//PART 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
 

   const imgEl = await Promise.all(imgs);
   console.log(imgEl);
   imgEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

// const arr = [1,2,2,4,3,5,9,6];
// const newArr = arr.map((num, i) => {
//   // return   num * 2;
//   // console.log(`${i + 1}: ${num *3}`);
//   return `${i + 1}: ${num *3}`;
//   return 24;
// });
// // console.log(arr);
// console.log(newArr);