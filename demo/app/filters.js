import {SortingFilter} from 'marionette.collectionhelper';

export const NameFilter = SortingFilter.extend({
  filterFunction(collection, term) {
    return collection.filter(
      model => this._startsWith(term, model.get('name')));
  },

  _startsWith(term, searchStr) {
    return searchStr.toLowerCase().startsWith(term.toLowerCase());
  }
});
