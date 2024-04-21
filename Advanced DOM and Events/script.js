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


//CREATING AND INSERTING ELEMENT
const header = document.querySelector('.header');

const message = document.createElement('div');
//with this, we don't always need to select the message element with doc.que, its already stored in the DOM
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics'

message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';

//header.prepend(message);
header.append(message);
*/

//to insert the element at multiple places;
// header.append(message.cloneNode(true));
//repeat as much as you want in order to clone

// header.before(message);
// header.after(message);

/*
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

//ATTRIBUTES e.g alt, src, class, id e.t.c
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

//We can manipulate the attribute texts
logo.alt = 'Beautiful Minimalist Logo';
console.log(logo.alt);

//Non Standard...these are attributes that are not associated with img, even though they don't exist in the real world, we can still get them
console.log(logo.designer);
logo.setAttribute('company', 'Bankist');

//to get the relative url/src;
console.log(logo.getAttribute('src'));

//to get the absolute url/src;
console.log(logo.src);

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));
//the link is absolute anyway so we wont really see any diff here

const linke = document.querySelector('.nav__link--btn');
console.log(linke.href);
console.log(linke.getAttribute('href'));
//getAttribute('href') will simply return '#'in cl, while the first will return the absolute link to the href

//Data Attributes
console.log(logo.dataset.versionNumber);
//the data attribute are always stored i the dataset obj. We use data attribute when we work with the UI, esp when we store data in the users' interface(HTML code);

logo.classList.add('c', 'j'); //we can pass multiple values into the classList method
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); //returns boolean //not includes

//we can also use className to set class to an element. This will however overwrite the existing classes and only allows us to set one class to an element, hence, do not use!!
// logo.className = 'jonas'
*/

//IMPLEMENTING SMOOTH SCROLLING
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){

  /*
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
//gets distance of the beginning of the webpage to the section1 element

console.log(e.target.getBoundingClientRect());
//gets distance of the beginning of the webpage to the btn clicked

console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
//we would get the scroll length(where we have scrolled to) for Y(vertical) and for X(horizontal);

//to read the viewport of the page
console.log(
  'height/width viewport', document.documentElement.clientHeight,  document.documentElement.clientWidth
); */

//Old way of implementing scroll effect
//Scrolling
// window.scrollTo(s1coords.left, s1coords.top)
//the top specified here is relative to the viewport and not  to the doc..not to the top of the page. Here, if we are few inches away from the the  top, we wont be able to implement the smooth scrolling

// window.scrollTo(
//   s1coords.l + window.pageXOffset,
//   s1coords.top + window.pageYOffset);
  //(current position + current scroll)
//with thi, evn if we are 5px  close to the section we want to scroll to, we would still be able to implement the smooth scrolling. I t is no longer relative to the viewport but now an absolute property

// window.scrollTo({
//   left: s1coords.l + window.pageXOffset,
//   top: s1coords.top + window.pageYOffset,
//   behavior: 'smooth'
// });

//more modern way of implementing scroll effect
section1.scrollIntoView({
behavior: 'smooth'
});

});