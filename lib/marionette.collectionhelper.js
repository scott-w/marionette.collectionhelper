/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _collections = __webpack_require__(1);

	Object.defineProperty(exports, 'Filter', {
	  enumerable: true,
	  get: function get() {
	    return _collections.Filter;
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Filter = exports.SortingCollection = undefined;

	var _backbone = __webpack_require__(2);

	var _base = __webpack_require__(3);

	var _filter = __webpack_require__(4);

	/** A sorting collection that ignores the underlying collection's sorting.
	    This proxies the models in the original collection, maintaining its own
	    state, but returning the real models in the collection.
	*/
	var SortingCollection = exports.SortingCollection = _backbone.Collection.extend({
	  constructor: function constructor(collection) {
	    _backbone.Collection.apply(this, collection.models, arguments);
	    (0, _base.postConstructInstance)(this, collection);
	  }
	});

	var Filter = exports.Filter = _backbone.Collection.extend({
	  constructor: function constructor(collection) {
	    _backbone.Collection.apply(this, collection.models, arguments);
	    (0, _base.postConstructInstance)(this, collection);
	    (0, _filter.bindSearchFunction)(this);
	  }
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = backbone;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.postConstructInstance = postConstructInstance;
	function postConstructInstance(collectionMapper, collection) {
	  collectionMapper._collection = collection;
	  bindMapEventsOn(collectionMapper);
	}

	function bindMapEventsOn(collectionMapper) {
	  collectionMapper.listenTo(collectionMapper._collection, 'add', add.bind(collectionMapper));
	  collectionMapper.listenTo(collectionMapper._collection, 'remove', remove.bind(collectionMapper));
	  collectionMapper.listenTo(collectionMapper._collection, 'update', update.bind(collectionMapper));
	  collectionMapper.listenTo(collectionMapper._collection, 'destroy', destroy.bind(collectionMapper));
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

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.bindSearchFunction = bindSearchFunction;
	/** Adds a search method to a collection.
	  @returns {undefined} undefined
	  @param {Backbone.Collection} collection - The collection to attach search to
	*/
	function bindSearchFunction(collection) {
	  collection.search = search;
	}

	/** Perform the actual search
	  @returns {undefined} undefined
	  @param {(string|object)} terms - Blah
	  @param {Object} [options] - Options to pass to the filter event.
	*/
	function search(terms, options) {
	  var result = doFilter(this._collection, this.filterFunction, terms);
	  this.set(result);
	  this.trigger('filter', this, terms, options);
	}

	/** Apply the filter function to the attached collection and return the result.
	  @returns {Backbone.Model[]} models - The result of the filter function.
	  @param {Backbone.Collection} collection - The collection to filter.
	  @param {function} filterFunction - The filtering function to use.
	  @param {(string|object)} terms - The search terms to pass to the filter function.
	*/
	function doFilter(collection, filterFunction, terms) {
	  return filterFunction.apply(collection, [terms]);
	}

/***/ }
/******/ ]);