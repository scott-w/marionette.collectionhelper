export function bindSearchFunction(collection) {
  collection.search = search;
}

function search(options) {
  const result = doFilter(this._collection, this.filterFunction, options);
  this.set(result);
}

function doFilter(collection, filterFunction, options) {
  return filterFunction.apply(collection, [options]);
}
