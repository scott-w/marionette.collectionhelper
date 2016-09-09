import {CollectionView, View} from 'backbone.marionette';
import Syphon from 'backbone.syphon';

import {NameFilter} from './filters';
import {FormModel} from './models';

import form from './templates/form.html';
import person from './templates/person.html';
import main from './templates/main.html';


const FormView = View.extend({
  tagName: 'form',
  template: form,

  ui: {
    searchBox: '.searchbox',
    sort: '.sort'
  },

  events: {
    'keyup @ui.searchBox': 'setForm',
    'click @ui.sort': 'runSort'
  },

  modelEvents: {
    'change:search': 'search'
  },

  setForm() {
    this.model.set(Syphon.serialize(this));
  },

  search(model, value) {
    this.collection.search(value);
  },

  runSort() {
    this.collection.orderBy('name');
  }
});


const Person = View.extend({
  tagName: 'li',
  template: person
});

const PersonList = CollectionView.extend({
  childView: Person,
  tagName: 'ol'
});

export const MainView = View.extend({
  template: main,

  regions: {
    person: '.person-hook',
    form: '.form-hook'
  },

  onRender() {
    const nameFilter = new NameFilter(this.collection);
    this.showChildView('form', new FormView({
      model: new FormModel(),
      collection: nameFilter
    }));
    this.showChildView('person', new PersonList({
      collection: nameFilter
    }));
  }
});
