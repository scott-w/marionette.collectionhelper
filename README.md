# Marionette Collection Helper

This library is a proof-of-concept for how I see `CollectionView` being managed
in future versions of Marionette.

## Setting Up

This isn't on NPM right now, so you'll have to install from Github:

```bash
npm install marionette.collectionhelper
```

## Guide

The [Docsite][docs] outlines how to use this library and how it works with 
Marionette.

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
[the Rationale document][rationale].

[docs]: http://scottwalton.codes/marionette.collectionhelper
[rationale]: http://scottwalton.codes/marionette.collectionhelper/rationale/