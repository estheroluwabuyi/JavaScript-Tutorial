'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
    e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btn => {
    btn.addEventListener('click', openModal);

    btnCloseModal.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          closeModal();
        }
      });

});

//////////////////
//////////////////
///LECTURES
//SELECTING, CREATING, AND DELETING ELEMENTS
//SELECTING ELEMENTS
/* console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const allSection = document.querySelectorAll('.section');
console.log(allSection);

document.getElementById('section--1');

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
console.log(document.getElementsByClassName('btn'));
*/

//CREATING AND INSERTING ELEMENT
const header = document.querySelector('.header');

const message = document.createElement('div');
//with this, we dont always need to select the message element with doc.que, its already stored in the DOM
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics'

message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';

//header.prepend(message);
header.append(message);

//to insert the element at multiple places;
// header.append(message.cloneNode(true));
//repeat as much as you want in order to clone

// header.before(message);
// header.after(message);

//Deleting Elements
document.querySelector('.btn--close--cookie').addEventListener('click',()=> {
// message.remove(); //newer way of removing
message.parentElement.removeChild(message); //old way of removing
});


//STYLES, ATTRIBUTES AND CLASSES
//STYLES
message.style.backgroundColor = '#37383D';
message.style.width = '120%';
console.log(message.style.width);
console.log(message.style.backgroundColor);
console.log(message.style.color); //we would get nothing in our cl becos js does not read the style that is absent in the DOM..inline styles
//to get the whole style of an element;
// console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//custom props or css variables
document.documentElement.style.setProperty('--color-primary', 'orangered');