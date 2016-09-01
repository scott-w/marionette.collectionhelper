import { Collection } from 'backbone';

import expect from 'expect.js';

import { Proxy } from '../src/collections';


describe('Proxy Collection', function() {
  let collection, proxy;

  beforeEach(function() {
    collection = new Collection([
      {id: 2, name: 'Steve'}, {id: 3, name: 'Helen'}
    ]);
    proxy = new Proxy(collection);
  });

  it('updates itself on collection update', function() {
    collection.set([{id: 9, name: 'Andy'}]);

    expect(proxy.length).to.be(1);
    expect(proxy.at(0).get('name')).to.equal('Andy');
  });

  it('adds a model on collection add', function() {
    collection.add({id: 9, name: 'Andy'});

    expect(proxy.length).to.be(3);
    expect(proxy.at(2).get('name')).to.equal('Andy');
  });

  it('removes a model on collection remove', function() {
    collection.remove(2);

    expect(proxy.length).to.be(1);
    expect(proxy.at(0).id).to.be(3);
  })
});
