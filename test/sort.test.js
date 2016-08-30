import { Collection } from 'backbone';

import expect from 'expect.js';

import { Sort } from '../src/collections';

describe('Sort collection', function() {
  const SortCollection = Sort.extend()
  let collection, sort;

  beforeEach(function() {
    collection = new Collection([
      {name: 'Test'}, {name: 'Harry'}, {name: 'Mary'}
    ]);

    sort = new SortCollection(collection);
  });

  it('gets the collection models by default', function() {
    expect(sort.length).to.be(3);

    expect(sort.at(0).get('name')).to.equal('Test');
    expect(sort.at(1).get('name')).to.equal('Harry');
    expect(sort.at(2).get('name')).to.equal('Mary');
  });

  it('can be sorted', function() {
    sort.orderBy('name');

    expect(sort.at(0).get('name')).to.equal('Harry');
    expect(sort.at(1).get('name')).to.equal('Mary');
    expect(sort.at(2).get('name')).to.equal('Test');
  })
});
