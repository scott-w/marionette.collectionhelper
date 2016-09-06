---
layout: document
title: API
permalink: /api/
---

# Filter/Sort API

Collection searching/sorting can be done either client-side or server-side. The
first aim of this document is to make it work well for data-heavy applications
inside the browser.

## Filtering

The filtering classes are helpers to handle client-side and server-side 
filtering in your collections for your views.

### Client Filtering

Filtering in the client allows you to filter your collections and re-render your
views against the filtered collection efficiently. This works by simply 
extending `Filter` and setting the `filterFunction`:

{% highlight js %}
import { Collection } from 'backbone';
import { Filter } from 'marionette.collectionhelper';

export const NameFilter = Filter.extend({
  filterFunction(term) {
    return this.where({
      name: term
    });
  }
});

const myCollection = new Collection([
  {name: 'Steve'}, {name: 'Sarah'}
]);

const filterProxy = new NameFilter(myCollection);

filterProxy.search('Steve');
filterProxy.each(model => console.log(model.get('name')));
// Prints Steve
{% endhighlight %}

## Sort

## Using With Marionette

The primary purpose of this library is to easily build Marionette applications
that don't depend on the in-built 'filter' and 'sort' methods. This is intended
as a drop-in replacement where a `Backbone.Collection` can be used.

To use with `CollectionView`, simply attach it to the `collection` as such:

{% highlight js %}
import { CollectionView, View } from 'backbone.marionette';
import { Collection } from 'backbone';
import { Filter } from 'marionette.collectionhelper';

/** Our item view */
const Person = View.extend({
  template: '#person-template',
  tagName: 'li'
});

/** Our Collection View */
const PersonList = CollectionView.extend({
  childView: Person,
  tagName: 'ol'
});

/* The outer layout */
const PersonLayout = View.extend({
  template: '#person-layout',
  region: {
    list: '.list-hook'
  },

  /** Our search box */
  ui: {
    searchBox: '.search-box'
  },

  events: {
    'keyup @ui.searchBox': 'runSearch'
  },

  onRender() {
    this.showChildView('list', new PersonList({
      collection: this.collection
    }));
  },

  /** Run the search against our filter collection. Every time the user types a
      search term, this will run the search terms against our collection and 
      automatically update the collection view. 
  */
  runSearch() {
    const searchTerm = this.ui.searchBox.val();
    this.collection.search(searchTerm);
  }
});

const people = new Collection([
  {name: 'Steve'}, {name: 'Michelle'}, {name: 'Harry'}
]);

/** Create our Filter */
const PeopleFilter = Filter.extend({

  /** Setup the filter function to search the collection */
  filterFunction(term) {
    return this.where({
      name: term
    });
  }
});

/** Instantiate our view */
const personView = new PersonLayout({
  /** Setup out collection as the filter wrapping the original collection */
  collection: new PeopleFilter(people)
});

/** Fake render - in a real application, we'd just use showChildView */
personView.render();
{% endhighlight %}

This example sets up a basic filtering setup. One of the key advantages of using
this `Filter` over the Marionette built-in `filter` is that you can share this
filtering class between views by just assigning it trivially.