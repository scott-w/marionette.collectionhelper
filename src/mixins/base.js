export function postConstructInstance(collectionMapper, collection) {
  collectionMapper._collection = collection;
  bindMapEventsOn(collectionMapper);
}

function bindMapEventsOn(collectionMapper) {
  collectionMapper.listenTo(
    collectionMapper._collection, 'add', add.bind(collectionMapper));
  collectionMapper.listenTo(
    collectionMapper._collection, 'remove', remove.bind(collectionMapper));
  collectionMapper.listenTo(
    collectionMapper._collection, 'update', update.bind(collectionMapper));
  collectionMapper.listenTo(
    collectionMapper._collection, 'destroy', destroy.bind(collectionMapper));
}

function add(model, collection, options) {
  this.trigger('add', model, this, options);
}

function remove(model, collection, options) {
  this.trigger('remove', model, this, options);
}

function update(collection, options) {
  this.set(collection.models);
}

function destroy(model, collection, options) {
  this.trigger('destroy', model, this, options);
}
