import _ from 'underscore';

/** Adds a search method to a collection.
  @returns {undefined} undefined
  @param {Backbone.Collection} collection - The collection to attach search to.
*/
export function bindSearchFunction(collection) {
  collection.search = search;
}

/** Perform the actual search
  @returns {Backbone.Collection} The filtered collection.
  @param {(string|object)} terms - The term or object of terms to search for.
  @param {Object} [options] - Options to pass to the filter event.
*/
function search(terms, options) {
  const result = doFilter(this._collection, this.filterFunction, terms);
  this.set(result);
  this.trigger('filter', this, terms, options);
  return this._collection;
}

/** Apply the filter function to the attached collection and return the result.
  @returns {Backbone.Model[]} models - The result of the filter function or all models if terms is undefined.
  @param {Backbone.Collection} collection - The collection to filter.
  @param {function} filterFunction - The filtering function to use.
  @param {[(string|object)]} terms - The search terms to pass to the filter function.
*/
function doFilter(collection, filterFunction, terms) {
  if (_.isUndefined(terms)) {
    return collection.models;
  }
  return filterFunction.apply(collection, [terms]);
}
