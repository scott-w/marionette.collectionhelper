/** Adds a search method to a collection.
  @returns {undefined} undefined
  @param {Backbone.Collection} collection - The collection to attach search to.
*/
export function bindSearchFunction(collection) {
  collection.search = search;
}

/** Perform the actual search. This calls the filterFunction in the context of
 *  the custom filter class and passes (collection, searchTerms) as the
 *  arguments.
  @returns {Backbone.Collection} The filtered collection.
  @param {(string|object)} terms - The term or object of terms to search for.
  @param {Object} [options] - Options to pass to the filter event.
*/
function search(terms, options = {searchEmpty: false}) {
  const noSearch = !terms && !options.searchEmpty;
  const collection = this._collection;
  const result = (
    noSearch ? collection.models : this.filterFunction(collection, terms));
  this.set(result);
  this.trigger('filter', this, terms, options);
  return this._collection;
}
