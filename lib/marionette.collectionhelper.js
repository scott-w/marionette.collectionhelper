module.exports =
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
	Object.defineProperty(exports, 'SortingFilter', {
	  enumerable: true,
	  get: function get() {
	    return _collections.SortingFilter;
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SortingFilter = exports.Filter = exports.Sort = exports.Proxy = undefined;

	var _backbone = __webpack_require__(2);

	var _base = __webpack_require__(3);

	var _filter = __webpack_require__(4);

	var _sort = __webpack_require__(6);

	var Proxy = exports.Proxy = _backbone.Collection.extend({
	  constructor: function constructor(collection) {
	    var args = updateArgs(collection, arguments);
	    _backbone.Collection.apply(this, args);
	    (0, _base.postConstructInstance)(this, collection);
	  }
	});

	/** A sorting collection that ignores the underlying collection's sorting.
	    This proxies the models in the original collection, maintaining its own
	    state, but returning the real models in the collection.
	*/
	var Sort = exports.Sort = Proxy.extend({
	  constructor: function constructor() {
	    Proxy.apply(this, arguments);
	    (0, _sort.bindSortFunction)(this);
	  }
	});

	/** A filtering collection that proxies models in the original collection to
	    filter on.

	    This adds a search method that performs the search against the real 
	    collection and updates this proxy for your view to respond.

	    When extending this, you will need to add a filterFunction method of the
	    signature:
	      filterFunction(terms) :=> [Backbone.Model]
	    The filterFunction context is the collection argument of this Filter.
	*/
	var Filter = exports.Filter = Proxy.extend({
	  constructor: function constructor() {
	    Proxy.apply(this, arguments);
	    (0, _filter.bindSearchFunction)(this);
	  }
	});

	var SortingFilter = exports.SortingFilter = Proxy.extend({
	  constructor: function constructor() {
	    Proxy.apply(this, arguments);
	    (0, _filter.bindSearchFunction)(this);
	    (0, _sort.bindSortFunction)(this);
	  }
	});

	/** Update the given arguments with the passed collection.
	  @returns {Object[]} args - The updated arguments to pass to the constructor.
	  @param {Backbone.Collection} collection - The original collection instance.
	  @param {Object[]} args - The arguments array to fix.
	*/
	function updateArgs(collection, args) {
	  args[0] = collection.models;
	  return args;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("backbone");

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.bindSearchFunction = bindSearchFunction;

	var _underscore = __webpack_require__(5);

	var _underscore2 = _interopRequireDefault(_underscore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** Adds a search method to a collection.
	  @returns {undefined} undefined
	  @param {Backbone.Collection} collection - The collection to attach search to.
	*/
	function bindSearchFunction(collection) {
	  collection.search = search;
	}

	/** Perform the actual search
	  @returns {Backbone.Collection} The filtered collection.
	  @param {(string|object)} terms - The term or object of terms to search for.
	  @param {Object} [options] - Options to pass to the filter event.
	*/
	function search(terms, options) {
	  var result = doFilter(this._collection, this.filterFunction, terms, options);
	  this.set(result);
	  this.trigger('filter', this, terms, options);
	  return this._collection;
	}

	/** Apply the filter function to the attached collection and return the result.
	  @returns {Backbone.Model[]} models - The result of the filter function or all models if terms is undefined.
	  @param {Backbone.Collection} collection - The collection to filter.
	  @param {function} filterFunction - The filtering function to use.
	  @param {[(string|object)]} terms - The search terms to pass to the filter function.
	  @param {[object]} options - Options to pass - pass "searchEmpty: true" to filter on empty values. Default is to return all models
	*/
	function doFilter(collection, filterFunction, terms, options) {
	  options = options || { searchEmpty: false };
	  if (!terms && !options.searchEmpty) {
	    return collection.models;
	  }
	  return filterFunction.apply(collection, [terms]);
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("underscore");

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.bindSortFunction = bindSortFunction;
	/** Binds the orderBy function to a collection to allow dynamic ordering.
	  @returns {undefined} undefined
	  @param {Backbone.Collection} collection - The collection to bind to.
	*/
	function bindSortFunction(collection) {
	  collection.orderBy = sort;
	}

	/** Perform the sort in-place based on the collection.
	  @returns {undefined} undefined
	  @param {(string|function)} comparator - Comparison string/function - see http://backbonejs.org/#Collection-comparator.
	  @param {[Object]} options - Options to pass into the sorting function.
	*/
	function sort(comparator, options) {
	  this.comparator = comparator;
	  this.sort(options);
	}

/***/ }
/******/ ]);