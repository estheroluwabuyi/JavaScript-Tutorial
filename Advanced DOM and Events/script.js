'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

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

//IMPLEMENTING SMOOTH SCROLLING
btnScrollTo.addEventListener('click', function (e) {
  //   const s1coords = section1.getBoundingClientRect();
  //   console.log(s1coords);
  // //gets distance of the beginning of the webpage to the section1 element

  // console.log(e.target.getBoundingClientRect());
  // //gets distance of the beginning of the webpage to the btn clicked

  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // //we would get the scroll length(where we have scrolled to) for Y(vertical) and for X(horizontal);

  // //to read the viewport of the page
  // console.log(
  //   'height/width viewport', document.documentElement.clientHeight,  document.documentElement.clientWidth
  // );

  //Old way of implementing scroll effect
  //Scrolling
  // window.scrollTo(s1coords.left, s1coords.top)
  //the top specified here is relative to the viewport and not  to the doc..not to the top of the page. Here, if we are few inches away from the the  top, we wont be able to implement the smooth scrolling

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset);
  //(current position + current scroll)
  //with thi, evn if we are 5px  close to the section we want to scroll to, we would still be able to implement the smooth scrolling. I t is no longer relative to the viewport but now an absolute property

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  //more modern way of implementing scroll effect
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

/////////////////////////////////////////
//Page Navigation
// document.querySelectorAll('.nav__link').forEach(function(el){
// el.addEventListener('click', function(e){
// e.preventDefault();
// // const id = this.getAttribute('href');
// // console.log(id);
// // document.querySelector(id).scrollIntoView({behavior: 'smooth'});
// });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    // console.log('Link');
    e.preventDefault();
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Building A Tabbed Component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //Guard clause; its an if statement that will return early if condition is matched;
  if (!clicked) return;

  //above is same as writing;
  // if (clicked) {
  // clicked.classList.add('operations__tab--active')
  // }

  //Removing Active classes..clearing class on all then adding to the one clicked
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Activate tab
  clicked.classList.add('operations__tab--active');

  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//MENU FADE ANIMATION
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

//Passing an arguement into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

//IMPLEMENTING A STICKY NAV BAR
const initialCoords = section1.getBoundingClientRect();
//console.log(initialCoords);

window.addEventListener('scroll', function (e) {
  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});

/*
//A BETTER WAY: THE INTERSECTION OBSERVER API
//This API allows our code to basically observe changes to the way that a certain target element intersects with another element, or the way it intersects with the viewport
//Instead of defining the functions and objects separately, we can call it inside the IntersectionObserver();

const obsCallback = function (entries, observer) {
  entries.forEach(entry =>{
console.log(entry);
  })
}

const obsOptions = {
  //obj needs a root..the root is the element the target is intersecting..i think the root is an element too..we can write null if don't want to select an element
  root: null, //root is null cos we are interested in the entire viewport

  //next, we have the threshold..its the % of the intersection at which the observer callback will be called...the callback function will gat called each time the observer element(section1) is intersecting the root el and the threshold that we defined 
threshold: [0, 0.2], //same as 10%..a percentage we want to have visible
//setting 0 means that our callback will be triggered each time the target element moves completely out of the view and fr 0.2, as soon as  it enters the view. If we specified 1, that means the callback function will get called only when the whole section1 is visible to the viewport. So basically the 0.2 means that when 20% of the section1 is visible to the viewport, then the callback function will be called
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
//so basically, whenever our target(section1) is intersecting the viewport(root) at 10%(threshold), then the callback function will get called
//function gets called with 2 arguments..entries and observer itself
*/

const header = document.querySelector('.header');

const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries; //same as entries[0]

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, //when 0% of the header is visible(completely out of view), then we want something to happen = this is why we set the threshold to 0
  rootMargin: `-${navHeight}px`, //only accepts px or percent
  //this is basically the length before or after the header that we want our callback function to be visible.
  //It simply make the sticky nav load a little early before it is reached
});

headerObserver.observe(header); //its observing header

//REVEAL SECTION
const allSection = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  //if its not intersecting, itd simply do nothing
  if (!entry.isIntersecting) return;

  //if it is intersecting, the below will work
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, //15%--section reveals when its 15% visible
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//LAZY LOADING IMAGES--really great for performance
const imgTarget = document.querySelectorAll('img[data-src]');
// console.log(imgTarget);

const loading = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  // console.log(entry.target);

  //only removes blur effect after the images have finish loading and the low quality image has been replaced with the high
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: '200px', //loads image a little early b4 its reached
});

imgTarget.forEach(img => imgObserver.observe(img));

//BUILDING A SLIDER COMPONENT
function slider() {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  //for btn
  let curSlide = 0;
  //to end the slides
  let maxSlide = slides.length; //length = 4

  // scaling the slider
  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.3) translateX(-1000px)';
  // slider.style.overflow = 'visible';

  //implementing the slider
  // slides.forEach((s, i) => {
  //   //we have 4 imgs so the length of i is typically 4, but remember it starts counting from 0 then we'd have 0 - 3(4L)
  //   s.style.transform = `translateX(${100 * i}%)`;
  //   //100 * i(0) = 0, 100 * i(1) = 2...
  //   //we want x to be @ i(0) = 0%, i(1) = 100%, i(2) = 200%, i(3) = 300%
  // // console.log(i);
  // });

  //FUNCTIONS
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  // createDots();

  function activateDot(slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }

  // activateDot(0);

  //function for the slider
  function goToSlide(slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
    //here we want X to be -100%, 0%, 100%, 200%
    //lets say the first slide is 1, 0-1=-1 * 100%=-100%
  }

  //same as the above we just set the slide(curSlide to 0)
  // goToSlide(0);

  //Next Slide
  function nextSlide() {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      //or we increase the slide by one
      curSlide++;
      activateDot(curSlide);
    }

    //when we click on btn, 1 will be added to curSlide
    goToSlide(curSlide);
  }

  //Go to prev slide
  function prevSlide() {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
      //rem; maxSlide = slides.length;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  }
  function init() {
    goToSlide(0);
    createDots();
    activateDot(0);
  }
  init();

  //Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  //ATTACHING EVENT HANDLER TO KEYBOARD EVENTS
  document.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
    //if(e.key === 'ArrowRight') nextSlide(); //same as above
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      //this would also work
      // const {slide} = e.target.dataset;
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
  //target is the child, currentTarget is the parent element
}
slider();

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


//to insert the element at multiple places;
// header.append(message.cloneNode(true));
//repeat as much as you want in order to clone

// header.before(message);
// header.after(message);

//Deleting Elements
// document.querySelector('.btn--close--cookie').addEventListener('click',()=> {
// // message.remove(); //newer way of removing
// message.parentElement.removeChild(message); //old way of removing
// });

//STYLES, ATTRIBUTES AND CLASSES
//STYLES
// message.style.backgroundColor = '#37383D';
// message.style.width = '120%';
// console.log(message.style.width);
// console.log(message.style.backgroundColor);
// console.log(message.style.color); //we would get nothing in our cl becos js does not read the style that is absent in the DOM..inline styles
//to get the whole style of an element;
// console.log(getComputedStyle(message));
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//custom props or css variables
// document.documentElement.style.setProperty('--color-primary', 'orangered');

//ATTRIBUTES e.g alt, src, class, id e.t.c
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// //We can manipulate the attribute texts
// logo.alt = 'Beautiful Minimalist Logo';
// console.log(logo.alt);

//Non Standard...these are attributes that are not associated with img, even though they don't exist in the real world, we can still get them
// console.log(logo.designer);
// logo.setAttribute('company', 'Bankist');

// //to get the relative url/src;
// console.log(logo.getAttribute('src'));

// //to get the absolute url/src;
// console.log(logo.src);

// const link = document.querySelector('.twitter-link');
// console.log(link.href);
// console.log(link.getAttribute('href'));
// //the link is absolute anyway so we wont really see any diff here

// const linke = document.querySelector('.nav__link--btn');
// console.log(linke.href);
// console.log(linke.getAttribute('href'));
//getAttribute('href') will simply return '#'in cl, while the first will return the absolute link to the href

// //Data Attributes
// console.log(logo.dataset.versionNumber);
// the data attribute are always stored i the dataset obj. We use data attribute when we work with the UI, esp when we store data in the users' interface(HTML code);

// logo.classList.add('c', 'j'); //we can pass multiple values into the classList method
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c'); //returns boolean //not includes

//we can also use className to set class to an element. This will however overwrite the existing classes and only allows us to set one class to an element, hence, do not use!!
// logo.className = 'jonas'

//Types of Events and Event Handlers
// const h1 = document.querySelector('h1');

//removing eventlistener
// const alertH1 = function (e){
//   alert('addEventListener: Great! You are reading the heading.');

//   // h1.removeEventListener('mouseenter', alertH1);
//   };

//ways of adding eventlistener
//1.
// h1.addEventListener('mouseenter', alertH1);

// //we can remove the event listener at any point / time;
// setTimeout(() =>  h1.removeEventListener('mouseenter', alertH1), 3000);

//2.
// h1.onmouseenter = function (e){
//   alert('onmouseenter: Great! You are reading the heading.');
//   };

//3. - using an html attribute
//<h1 onclick="alert('HTML alert')">

//EVENT PROPAGATION: BUBBLING AND CAPTURING
//rgb(255,255,255)
// const randomInt = (min, max) =>
// Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// //console.log(randomColor(0, 255));

// document.querySelector('.nav__link').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
// console.log('LINK', e.target, e.currentTarget);
// console.log(e.currentTarget === this);

// // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// });

// document.querySelector('.nav').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// });

//EVENT DELEGATION: Implementing Page Navigation


//DOM TRAVERSING
const h1 = document.querySelector('h1');

//Going Downwards(selecting child element)
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
//childNodes is not that used we use .children instead
console.log(h1.children);

//to select fist and last element child
console.log(h1.firstElementChild);
h1.firstElementChild.style.color = 'white';
//changes the color of the first element of h1...element enclosed in a tag
h1.lastElementChild.style.color = 'orangered';
//changes the color of the last element of h1...element enclosed in a tag e.g div, span e.t.c

//Going Upwards (Selecting parent element)
console.log(h1.parentNode); //returns nodes
console.log(h1.parentElement);

//lets say for example, we have multiple headers in our html, and we want to select the one closest to  h1..the direct header of h1;
h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';
//this would select h1 itself

//Going sideways: siblings; in js, we can only access the direct siblings...only prev and next
console.log(h1.previousElementSibling); //wed get null in cl bcos this h1 has no prev sibling
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling); //returns node list

//to get all the siblings;
console.log(h1.parentElement.children); //wed get all the siblings of h1 plus h1 itself
[...h1.parentElement.children].forEach(function(el){
  // if(el !== h1) el.style.transform = 'scale(0.5)'
});
*/

//Lifecycle DOM Events
//DOM CONTENT LOADED
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

//LOAD EVENT
window.addEventListener('load', function(e){
  console.log('PAGE FULLY LOADED', e);
});

//BEFOREUNLOAD
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });