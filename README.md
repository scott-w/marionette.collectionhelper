# Marionette Collection Helper

This library is a proof-of-concept for how I see `CollectionView` being managed
in future versions of Marionette.

## Rationale

Marionette's `CollectionView` has many issues regarding how it handles sorting
and filtering. For full information, see
[the Rationale document](./docs/rationale.md).

## Setting Up

This isn't on NPM right now, so you'll have to install from Github:

```bash
npm install git@github.com:scott-w/marionette.collectionhelper
# Totally guessing, I'll put the right command up when I look it up
```

## Building and Testing

To build and test the collection helper library:

```bash
npm i --no-progress
npm run compile
npm t
```
