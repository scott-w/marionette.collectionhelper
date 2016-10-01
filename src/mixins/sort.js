import {isUndefined} from 'underscore';


/** Binds the orderBy function to a collection to allow dynamic ordering.
  @returns {undefined} undefined
  @param {Backbone.Collection} collection - The collection to bind to.
*/
export function bindSortFunction(collection) {
  if (isUndefined(collection.sortFunction)) {
    collection.orderBy = sort;
  } else {
    collection.orderBy = collection.sortFunction;
  }
}

/** Perform the sort in-place based on the collection.
  @returns {undefined} undefined
  @param {(string|function)} comparator - Comparison string/function - see http://backbonejs.org/#Collection-comparator.
  @param {[Object]} options - Options to pass into the sorting function.
*/
function sort(comparator, options) {
  this.comparator = comparator;
  this.sort(options);
}
