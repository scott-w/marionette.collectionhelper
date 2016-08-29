import { Collection } from 'backbone';

import expect from 'expect.js';

import { Filter } from '../src/collections';

describe('Filter mapper', function() {
  const CollectionFilter = Filter.extend({
    filterFunction(value) {
      return this.where({name: value});
    }
  })
  let collection, filter;

  beforeEach(function() {
    collection = new Collection([
      {name: 'Test'}, {name: 'Harry'}, {name: 'Mary'}
    ]);

    filter = new CollectionFilter(collection);
  });

  it('proxies the filter method', function() {
    filter.search('Harry');

    expect(filter.length).to.be(1);
    expect(filter.at(0).get('name')).to.equal('Harry');
  });

  it('makes no change to the attached collection', function() {
    filter.search('harry');

    expect(collection.length).to.be(3);
  });
});
