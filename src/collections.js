import { Collection } from 'backbone';
import { postConstructInstance } from './mixins/base';
import { bindSearchFunction } from './mixins/filter';
import { bindSortFunction } from './mixins/sort';


export const Proxy = Collection.extend({
  constructor(collection) {
    const args = updateArgs(collection, arguments);
    Collection.apply(this, args);
    postConstructInstance(this, collection);
  }
});


/** A sorting collection that ignores the underlying collection's sorting.
    This proxies the models in the original collection, maintaining its own
    state, but returning the real models in the collection.
*/
export const Sort = Proxy.extend({
  constructor() {
    Proxy.apply(this, arguments);
    bindSortFunction(this);
  }
});


/** A filtering collection that proxies models in the original collection to
    filter on.

    This adds a search method that performs the search against the real 
    collection and updates this proxy for your view to respond.

    When extending this, you will need to add a filterFunction method of the
    signature:
      filterFunction(terms) :=> [Backbone.Model]
    The filterFunction context is the collection argument of this Filter.
*/
export const Filter = Proxy.extend({
  constructor() {
    Proxy.apply(this, arguments);
    bindSearchFunction(this);
  }
});


export const SortingFilter = Proxy.extend({
  constructor() {
    Proxy.apply(this, arguments);
    bindSearchFunction(this);
    bindSortFunction(this);
  }
})

/** Update the given arguments with the passed collection.
  @returns {Object[]} args - The updated arguments to pass to the constructor.
  @param {Backbone.Collection} collection - The original collection instance.
  @param {Object[]} args - The arguments array to fix.
*/
function updateArgs(collection, args) {
  args[0] = collection.models;
  return args;
}
