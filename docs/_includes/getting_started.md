## Setting Up

Install via NPM:

```bash
npm install marionette.collectionhelper
```

You can then include it in your JS views:

```javascript
import { Filter } from 'marionette.collectionhelper';

const NameFilter = Filter.extend({
  filterFunction: function(term) {
    return this.where({
      name: term
    });
  }
});

filter = new NameFilter(new Collection([{name: 'Sarah'}]));
filter.search('Sarah');
```

## Guide

The [API Guide](./api) outlines how to use this library and how it works
with Marionette.

## Building and Testing

To build and test the collection helper library:

```bash
npm i --no-progress
npm run compile
npm t
```

## Rationale

Marionette's `CollectionView` has many issues regarding how it handles sorting
and filtering. For full information, see
[the Rationale document](./rationale).
