import { Collection } from 'backbone';
import { postConstructInstance } from './mixins/base';
import { bindSearchFunction } from './mixins/filter';
import { bindSortFunction } from './mixins/sort';


/** A sorting collection that ignores the underlying collection's sorting.
    This proxies the models in the original collection, maintaining its own
    state, but returning the real models in the collection.
*/
export const Sort = Collection.extend({
  constructor(collection) {
    const args = [collection.models];
    for (let i = 1; i < arguments.length; ++i) {
      args.push(arguments[i]);
    }
    Collection.apply(this, args);
    postConstructInstance(this, collection);
    bindSortFunction(this);
  }
});


export const Filter = Collection.extend({
  constructor(collection) {
    const args = [collection.models];
    for (let i = 1; i < arguments.length; ++i) {
      args.push(arguments[i]);
    }
    Collection.apply(this, args);
    postConstructInstance(this, collection);
    bindSearchFunction(this);
  }
});
