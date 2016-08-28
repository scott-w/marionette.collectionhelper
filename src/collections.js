import {Collection} from 'backbone';
import { postConstructInstance } from './mixins/base';


/** A sorting collection that ignores the underlying collection's sorting.
    This proxies the models in the original collection, maintaining its own
    state, but returning the real models in the collection.
*/
export const SortingCollection = Collection.extend({
  constructor(collection, ...args) {
    Collection.apply(this, collection.models, args);
    postConstructInstance(this, collection);
  }
});
