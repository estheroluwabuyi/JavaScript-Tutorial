'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

///////////////////////
//////////////////////
// HOW TO PLAN A WEB PROJECT
/* PROCESSES OF PLANNING;
1. User Stories (common format)
2. Features
3. FlowChart
4. Project Architecture
*/

///////////////////////
//////////////////////
// USING GEOLOCATION API
navigator.geolocation.getCurrentPosition(
  function (position) {
    // Called with a parameter named 'position'
    // console.log(position);
    // const latitude = position.coords.latitude;
    const { latitude } = position.coords; //same as above but destructured
    const { longitude } = position.coords;
    // console.log(latitude, longitude);

    console.log(`https://www.google.com/maps/@${latitude},${longitude}
        `);
    //the latitude and longitude defined here same as the one destructured above.

    //LEAFLET API
    const coords = [latitude, longitude];
    console.log(coords);

    const map = L.map('map').setView(coords, 13);
    //13 is the zoom level of the map
    //L is namespace that leaflet gives us. The L has a couple of methods that we can use. One is the maps method, another is the tileLayer and marker

    // console.log(map);
    //https://tile.openstreetmap.org/{z}/{x}/{y}.png....we can change the theme of the map displayed..browse fo themes
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        //the maps layers are made up of small tiles and these tiles come from openstreetmap url

        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.on('click', function (mapEvent) {
      console.log(mapEvent);
      const { lat, lng } = mapEvent.latlng;

      L.marker([lat, lng])
        //L.marker creates the marker
        .addTo(map)
        //adds marker to map
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',
          })
        )
        //creates popup and bind to the marker
        .setPopupContent('Workout')
        .openPopup();
    });
  },
  function () {
    alert('Could not get your position');
  }
);

// getCurrentPosition() takes in 2 callback functions.
// First is the one that would be called on success -
// whenever the browser successfully gets the coordinate
// of the current position of the user.
// The second callback is the one that would be called
// when there has been an error in getting the coordinates.

//DISPLAYING A MAP USING LEAFLET LIBRARY
//leaflet is an open-source JavaScript library for mobile-friendly interactive maps

// console.log(firstName);
//we can access the other scripts in another script. We can access firstName from other.js in our script.js.Reason is that firstName var is a global variable in this script. Any var that is global in a script will be available in other scripts, as long as it appears after that script included in HTML. In our case, script.js has access to all the var in other.js and leaflet.js, but other.js does not have access to anything in script.js because it appears afterwards. Reason being that, by the time other.js script is executed, script.js has not being loaded.

/////////////////////////
/////////////////////////
//DISPLAYING A MAP MARKER
