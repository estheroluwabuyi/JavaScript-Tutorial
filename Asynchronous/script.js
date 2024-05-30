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

/*
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
}


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

getCountryAndNeighbour('usa');
//no matter how much we reload it, portugal will always come before spain because it  is dependent on it

setTimeout(() => {
  console.log('1 second passed');

  setTimeout(() => {
    console.log('2 second passed');

    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
        
      }, 1000);
      
    }, 1000);
    
  }, 1000);
  
}, 1000);
*/

// PROMISES AND FETCH API
//  const request = new XMLHttpRequest();
//  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//  request.send();

const request = fetch('https://restcountries.com/v3.1/name/portugal');
console.log(request);