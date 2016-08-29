import {Collection} from 'backbone';
import { postConstructInstance } from './mixins/base';
import { bindSearchFunction } from './mixins/filter';


/** A sorting collection that ignores the underlying collection's sorting.
    This proxies the models in the original collection, maintaining its own
    state, but returning the real models in the collection.
*/
export const SortingCollection = Collection.extend({
  constructor(collection) {
    Collection.apply(this, collection.models, arguments);
    postConstructInstance(this, collection);
  }
});


export const Filter = Collection.extend({
  constructor(collection) {
    Collection.apply(this, collection.models, arguments);
    postConstructInstance(this, collection);
    bindSearchFunction(this);
  }
});
