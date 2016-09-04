import {Filter} from 'marionette.collectionhelper';

export const NameFilter = Filter.extend({
  filterFunction(term) {
    return this.where({
      name: term
    });
  }
});
