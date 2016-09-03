---
layout: document
title: Rationale
permalink: /rationale/
---
# Rationale

The `CollectionHelper` is a proposed solution to how we should resolve the
sort, filter, and paging issues in Marionette.

## Marionette Issues

The development of Marionette 2.x and 3.0 uncovered, and continues to uncover,
numerous issues with the `sort` and `filter` methods on `CollectionView`. These
included:

1. Numerous conflicts between the two.
2. Performance issues.
3. Issues keeping the DOM up-to-date with the sort/filter status.
4. Ignores `Backbone.Collection` `sort` and `filter` methods.
5. No clear way to share filters between views.

A good solution should allow the Marionette code base to focus on efficently
synchronising the `CollectionView` with the attached collection, provide a 
clear, documented way to manage sorting and filtering, cleanly separate concerns
and work within the existing Backbone and Marionette ecosystem.

### Why Not Collection?

While the `CollectionView` will respect `sort` on a `Collection`, there is no
clean way to `filter` a collection without removing models from it. While this
works fine if the collection is managed server-side, it doesn't work at all when
we want to manage a client-side collection quickly.

In addition, if we share a collection between two `CollectionView` instances, we
might not want to filter or sort them in tandem. The user may not expect this
behavior and it may cause unnecessary rendering to be performed.

### Why Collection?

Despite these downsides, the `Collection` does include a well-understood sorting
implementation and has plenty of methods for actually filtering collections. We
should utilize this existing codebase where we can and build on-top of them in a
way that makes sense for Marionette.

On the Marionette side, the `CollectionView` is perfectly capable of smartly
rendering changes to the attached collection. If we improve the implementation
of collection, we should be able to get even more performance from the current
implementation. If we remove the `filter` and `sort` implementations from the
`CollectionView` then we no longer have to account for this internal state.

### Server-side considerations

Most server-side integration is currently developed ad-hoc in each project. An
ideal solution is to provide clean hooks and documented methods for interacting
with a RESTful HTTP API. Whilst this is a "simpler" integration in that it is
just intended to pass information through to the API, an idea situation is to
give some nice hook-points and options to bind quickly.

## Proposals

My proposed solution is to use a form of intermediary `Collection` that
maintains sorting and filtering state. It will need to proxy all its matching
collection events through to the listening view. It will also need to cleanly
respond to significant changes in the collection's internal state.

### Intermediary Collection

The diagram below gives an idea of how to build up this state:

![Using an Intermediary Collection](./intermediary-collection.png)

The intermediary collection would mean making no changes to the existing
Marionette codebase and would handle all filtering and sorting for Marionette.
In time, we could deprecate the `filter` and `sort` methods for removal from
Marionette 4.0.

Alternatively, we could proxy `filter` and `sort` into this collection in a way
that means when the developer sets the methods, it simply acts directly on the
collection instead of building up an internal state.

Below is a possible code example:

{% highlight js %}
import _ from 'lodash';
import {Collection} from 'backbone';
import {CollectionView, View} from 'backbone.marionette';

import {FilteringSortingCollection} from 'marionette.collectionhelper';

import {MyModel} from './models';

const MyCollection = Collection.extend({
  model: MyModel
});

const myCollection = new MyCollection([
  {name: 'David'}, {name: 'Steven'}, {name: 'Sally'}, {name: 'Alan'}
]);

const MyManagedCollection = FilteringSortingCollection.extend({
  comparator: 'name',
  searcher: function(value) {
    const lower = value.toLowercase();
    return this.filter(
      model => model.get('name').toLowercase().startsWith(lower));
  }
});

const sortedCollection = new MySortingCollection(myCollection);

const MyView = View.extend({
  tagName: 'li',
  template: _.template('<%- name %>')
});

const MyCollectionView = CollectionView.extend({
  tagName: 'ol',
  childView: MyView
});

const myView = new MyCollectionView({
  collection: sortedCollection
});

myView.render();
/* Outputs:
  <ol>
    <li>Alan</li>
    <li>David</li>
    <li><Steven</li>
  </ol>
*/

myView.search('David');
/* Outputs:
  <ol>
    <li>David</li>
  </ol>
*/

myView.search('s');
/* Outputs:
  <ol>
    <li>Sally</li>
    <li>Steven</li>
  </ol>
*/
{% endhighlight %}

The idea behind this code should be able to filter and enforce sorting order
without adding complex code into the Marionette codebase itself. The methods
should allow the developer to return raw lists of objects and then just manage
converting them into the collection silently.

The downside to this approach is it's quite verbose: you need to define and
instantiate a separate comparator manager class and assign a collection. A
much nicer way to handle this would be to have Marionette handle that for us.

### Sort/Filter Manager

Assigning a separate sorting and filtering manage for a `CollectionView` would
let us assign a definition and have Marionette manage its creation and
destruction.

The diagram below outlines this proposal:

![Using a separate Collection Manager](./collection-manager.png)

As we can see, Marionette will manage the lifecycle of the manager and we just
have to define it.

The code snippet below will provide a good comparison:

{% highlight js %}
import _ from 'lodash';
import {Collection} from 'backbone';
import {CollectionView, View} from 'backbone.marionette';

import {FilteringSortingCollection} from 'marionette.collectionhelper';

import {MyModel} from './models';

const MyCollection = Collection.extend({
  model: MyModel
});

const myCollection = new MyCollection([
  {name: 'David'}, {name: 'Steven'}, {name: 'Sally'}, {name: 'Alan'}
]);

const MyManagedCollection = FilteringSortingCollection.extend({
  comparator: 'name',
  searcher: function(value) {
    const lower = value.toLowercase();
    return this.filter(
      model => model.get('name').toLowercase().startsWith(lower));
  }
});

const MyView = View.extend({
  tagName: 'li',
  template: _.template('<%- name %>')
});

const MyCollectionView = CollectionView.extend({
  tagName: 'ol',
  childView: MyView
});

const myView = new MyCollectionView({
  collection: sortedCollection,
  filterer: MyManagedCollection
});

myView.render();
/* Outputs:
  <ol>
    <li>Alan</li>
    <li>David</li>
    <li><Steven</li>
  </ol>
*/

myView.search('David');
/* Outputs:
  <ol>
    <li>David</li>
  </ol>
*/

myView.search('s');
/* Outputs:
  <ol>
    <li>Sally</li>
    <li>Steven</li>
  </ol>
*/
{% endhighlight %}

## Inspiration

The idea behind this implementation comes from
[Django REST Framework Filters][drf-filter] and how they get attached to the
`ViewSet` separately from the `queryset` or `get_queryset` handlers.

This clean separation means developers can set a base `get_queryset` that
manages the filters that the view will always apply e.g. restricting data to
that owned by the current user. The view can then provide filter fields that the
user can optionally apply to a `QuerySet` after it has been prepared. Django
REST Framework will then manage how to apply these filters. It also provides
backends for automatically sorting and passing sorting parameters for the user
to request.

In a related topic, paging is designed in a similar way - a separate paging
class that gets attached to a `ViewSet` that cleanly separates paging from the
querying, filtering, and sorting logic.

The server-side integration draws heavily on the  
[Backbone.Paginator][paginator] library. One of the great things in 
`PageableCollection` is the hidden collection that lets us act on just a page at
a time or the entire collection. However, it doesn't fully resolve the issues
outlined above.

[drf]: http://www.django-rest-framework.org/api-guide/filtering/
[paginator]: https://github.com/backbone-paginator/backbone.paginator