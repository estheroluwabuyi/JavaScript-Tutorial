import View from './view';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg'; //Parcel 2.0
import resultsView from './resultsView';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
  _message = '';

  _generateMarkup() {
    return this._data.map(bookmark => previewView.render(result)).join('');
  }
}

export default new BookmarksView();
