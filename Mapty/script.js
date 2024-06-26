'use strict';

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
// MANAGING WORKOUT DATA: CREATING CLASSES
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  // id = (new Date() + '').slice(-10);
  clicks = 0;



  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; //in km
    this.duration = duration; //in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click(){
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this._setDescription();
    this.calcPace();
  }

  calcPace() {
    //min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
    // this.type = 'cycling'
  }

  calcSpeed() {
    //km/h
    this.speed = this.distance / (this.duration / 60);
    //we divided duration by 60 because duration is in hours
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1);
// console.log(cycling1);

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


///////////////////////
//////////////////////
//REFACTORING FOR PROJECT ARCHITECTURE
class App {
  #map;
  #mapEvent;
  #workouts = [];
  #mapZoomLevel = 13;

  constructor() {
    //Get users position
    this._getPosition();

    //Get data from localStorage
    this._getLocalStorage();

    form.addEventListener('submit', this._newWorkout.bind(this));
    //with the bind method, instead of the this keyword pointing to form, it would now point to App

    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  // USING GEOLOCATION API
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    console.log(`https://www.google.com/maps/@${latitude},${longitude}
        `);

    //LEAFLET API
    const coords = [latitude, longitude];
    // console.log(coords);

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //Handling Clicks on Map
    this.#map.on('click', this._showForm.bind(this));

    
   this.#workouts.forEach(work => {
    this._renderWorkoutMarker(work);
   })
  
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    //Empty Inputs
    // prettier-ignore
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => {
      form.style.display = 'grid';
    }, 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    //...inputs converts all inputs into arrays
    //Function to check valid NO
    const validInput = (...inputs) => inputs.every(inp => Number.isFinite(inp));
    //loops over the array and checks if each number is finite or not. In the end, the every method will only return true if the value was true for all of the arrays

    //Function to check positive NO
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    //GET DATA FROM FORM
    const type = inputType.value;
    const distance = +inputDistance.value; //+ converts the value to number
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    //IF WORKOUT IS RUNNING, CREATE RUNNING OBJ
    if (type === 'running') {
      const cadence = +inputCadence.value;

      //CHECK IF DATA IS VALID
      if (
        //   !Number.isFinite(distance) ||
        //   !Number.isFinite(duration) ||
        //   !Number.isFinite(cadence)
        !validInput(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('You have to input a positive number');
      //if distance value is not a number

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    //IF WORKOUT IS CYCLING, CREATE CYCLING OBJ
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInput(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('You have to input a positive number');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    //ADD NEW OBJ TO WORKOUT ARRAY
    this.#workouts.push(workout);
    console.log(workout);

    //RENDER WORKOUT ON MAP AS MARKER
    this._renderWorkoutMarker(workout);

    //RENDER WORKOUT ON LIST
    this._renderWorkout(workout);

    //HIDE FORM + CLEAR INPUT FIELDS
    this._hideForm();

    //Set local storage to all workouts
    this._setLocalStorage();
  }


  _renderWorkoutMarker(workout) {
    // Display Marker
    L.marker(workout.coords)
      //L.marker creates the marker
      .addTo(this.#map)
      //adds marker to map
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      //creates popup and bind to the marker
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
  `;

    if (workout.type === 'running') {
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
      </div>
    </li>
`;
    }

    if (workout.type === 'cycling') {
      html += `
      <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed.toFixed(1)}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${workout.elevationGain}</span>
      <span class="workout__unit">m</span>
    </div>
  </li>
      `;
    }

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e){
const workoutEl = e.target.closest('.workout');
// console.log(workoutEl);

if (!workoutEl) return;


const workout = this.#workouts.find(work =>  work.id === workoutEl.dataset.id);
console.log(workout);

//moving to marker on click still using the leaflet API. The setView method needs 3 parameters;  the coord as the first argument, the second is the zoom level and the third is the  obj of options
this.#map.setView(workout.coords, this.#mapZoomLevel, {
  animate: true,
  pan: {duration: 1} //animation duration
});


  // using the public interface
  // workout.clicks();  
  }

  //Setting the localStorage
  _setLocalStorage(){
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    //with this , we have set all the workouts to a local storage
  }

  //Displaying the localStorage
  _getLocalStorage(){
   const data = JSON.parse(localStorage.getItem('workouts'));
  //  console.log(data);

   if (!data) return;
   
   this.#workouts = data;

   this.#workouts.forEach(work => {
    this._renderWorkout(work);
   })
  }

  //Clearing the data
//call app.reset() in console to reset app
  reset(){
    localStorage.removeItem('workouts');
    location.reload();
  }

}

const app = new App();









































/*
if (navigator.geolocation) {
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

      map = L.map('map').setView(coords, 13);
      //13 is the zoom level of the map
      //L is namespace that leaflet gives us. The L has a couple of methods that we can use. One is the maps method, another is the tileLayer and marker

      // console.log(map);
      //https://tile.openstreetmap.org/{z}/{x}/{y}.png....we can change the theme of the map displayed..browse fo themes
      //the maps layers are made up of small tiles and these tiles come from openstreetmap url
      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //Handling Clicks on Map
      map.on('click', function (mapE) {
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    function () {
      alert('Could not get your position');
    }
  );
}
*/

/*
form.addEventListener('submit', function (e) {
  e.preventDefault();

  //Clear Input Fields
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      '';

  // Display Marker
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

inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
*/

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

/////////////////////////
/////////////////////////
//RENDERING A MAP MARKER

/////////////////////////
/////////////////////////
//PROJECT ARCHITECTURE
//1. Determine where and how to store the data. Data is the most fundamental part of an application. Without data, it doesnt make sense to have an app in the first place
