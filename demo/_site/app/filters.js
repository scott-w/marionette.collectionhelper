import {SortingFilter} from 'marionette.collectionhelper';

export const NameFilter = SortingFilter.extend({
  filterFunction(term) {
    return this.where({
      name: term
    });
  }
});
