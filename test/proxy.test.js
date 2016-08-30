import { Collection } from 'backbone';

import expect from 'expect.js';

import { Proxy } from '../src/collections';


describe('Proxy Collection', function() {
  let collection, proxy;

  beforeEach(function() {
    collection = new Collection([
      {name: 'Steve'}, {name: 'Helen'}
    ]);
    proxy = new Proxy(collection);
  });

  it('updates itself on collection update', function() {
    collection.set([{name: 'Andy'}]);

    expect(proxy.length).to.be(1);
    expect(proxy.at(0).get('name')).to.equal('Andy');
  });
});
