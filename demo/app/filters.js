import {SortingFilter} from 'marionette.collectionhelper';

export const NameFilter = SortingFilter.extend({
  filterFunction(collection, term) {
    return collection.filter(
      model => this._startsWith(term, model.get('name')));
  },

  sortFunction(term) {
    const isReversed = term.startsWith('-');
    const realTerm = isReversed ? term.slice(1) : term;
    const greaterFirst = isReversed ? -1 : 1;
    const lesserFirst = isReversed ? 1 : -1;

    this.comparator = function(first, second) {
      const firstTerm = first.get(realTerm);
      const secondTerm = second.get(realTerm);
      if (firstTerm > secondTerm) {
        return greaterFirst;
      } else if (firstTerm < secondTerm) {
        return lesserFirst;
      }
      return 0;
    }
    this.sort();
  },

  _startsWith(term, searchStr) {
    return searchStr.toLowerCase().startsWith(term.toLowerCase());
  }
});
