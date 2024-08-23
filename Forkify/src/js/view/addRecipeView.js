import View from './view.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this)); //using bind we manually set the this keyword to the toggleWindow method which points to the AddRecipeView object because the this keyword if used here will point directly to the _btnOpen
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; //the this here points to the _parentElement(uploadForm)
      //technically we converted the form to an API--big object
      //instead of selecting all the form values manually, with Form data we get to select the whole value in one go, we just have to pass in the form element we are selecting

      const data = Object.fromEntries(dataArr); //converts an array of entries into object
      handler(data); //handler is now controlAddRecipe
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
