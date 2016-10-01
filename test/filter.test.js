import { Collection } from 'backbone';

import expect from 'expect.js';

import { Filter } from '../src/collections';

describe('Filter mapper', function() {
  const CollectionFilter = Filter.extend({
    filterFunction(collection, value) {
      return collection.where({name: value});
    }
  });
  let collection, filter;

  beforeEach(function() {
    collection = new Collection([
      {name: 'Test'}, {name: 'Harry'}, {name: 'Mary'}
    ]);

    filter = new CollectionFilter(collection);
  });

  it('defaults to setting all models', function() {
    expect(filter.length).to.be(3);
    expect(filter.at(0).get('name')).to.equal('Test');
    expect(filter.at(1).get('name')).to.equal('Harry');
    expect(filter.at(2).get('name')).to.equal('Mary');
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

  it('restores collection if searched empty', function() {
    filter.search('Harry');
    filter.search();

    expect(filter.length).to.be(3);
    expect(filter.at(0).get('name')).to.equal('Test');
    expect(filter.at(1).get('name')).to.equal('Harry');
    expect(filter.at(2).get('name')).to.equal('Mary');
  });

  it('restores collection on empty string search', function() {
    filter.search('Harry');
    filter.search('');

    expect(filter.length).to.be(3);
    expect(filter.at(0).get('name')).to.equal('Test');
    expect(filter.at(1).get('name')).to.equal('Harry');
    expect(filter.at(2).get('name')).to.equal('Mary');
  });

  it('takes a searchEmpty option to look up empty value', function() {
    filter.search('Harry');
    filter.search('', {searchEmpty: true});

    expect(filter.length).to.be(0);
  });
});


describe('Filter mapper binding', function() {
  const CollectionFilter = Filter.extend({
    initialize(collection, options = {nofilter: false}) {
      this.nofilter = options.nofilter;
    },

    filterFunction(collection, value) {
      if (this.actuallyFilter()) {
        return collection.where({name: value});
      }
      return collection.models;
    },

    actuallyFilter() {
      return !this.nofilter;
    }
  });
  let collection, filter;

  beforeEach(function() {
    collection = new Collection([
      {name: 'Test'}, {name: 'Harry'}, {name: 'Mary'}
    ]);

  });

  it('binds this to the filter', function() {
    filter = new CollectionFilter(collection);

    filter.search('Test');
    expect(filter.length).to.be(1);
    expect(filter.at(0).get('name')).to.equal('Test');
  });

  it('works with the initialize', function() {
    filter = new CollectionFilter(collection, {nofilter: true});

    filter.search('Test');
    expect(filter.length).to.be(3);
  });
});

