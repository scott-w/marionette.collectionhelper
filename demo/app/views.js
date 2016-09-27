import {CollectionView, View} from 'backbone.marionette';
import Syphon from 'backbone.syphon';

import {NameFilter} from './filters';
import {FormModel, TimeModel} from './models';

import form from './templates/form.html';
import person from './templates/person.html';
import main from './templates/main.html';
import timer from './templates/timer.html';


const FormView = View.extend({
  className: 'form-inline',
  tagName: 'form',
  template: form,

  sorted: false,

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
    this.triggerMethod('start:search');
    this.collection.search(value);
  },

  runSort() {
    if (!this.sorted || this.sorted.startsWith('-')) {
      this.collection.orderBy('name');
      this.sorted = 'name';
    } else {
      this.collection.orderBy('-name');
      this.sorted = '-name';
    }
  }
});


const Person = View.extend({
  tagName: 'li',
  template: person
});

const PersonList = CollectionView.extend({
  childView: Person,
  tagName: 'ol',

  collectionEvents: {
    filter: 'endTimer'
  },

  onBeforeRender() {
    this.startTimer();
  },

  onRender() {
    this.endTimer();
  },

  onBeforeRenderChildren() {
    this.startTimer();
  },

  onRenderChildren() {
    this.endTimer();
  },

  onBeforeRenderEmpty() {
    this.startTimer();
  },

  onRenderEmpty() {
    this.endTimer();
  },

  startTimer() {
    this._setTimer('startTime');
  },

  endTimer() {
    this._setTimer('endTime');
  },

  _setTimer(field) {
    this.model.set(field, Date.now());
  }
});

const TimerView = View.extend({
  className: 'lead',
  tagName: 'p',
  template: timer,

  modelEvents: {
    'change': 'render'
  },

  templateContext() {
    return {
      elapsed: this.model.calculateElapsed()
    };
  }
});

export const MainView = View.extend({
  template: main,

  regions: {
    person: '.person-hook',
    form: '.form-hook',
    time: '.timer-hook'
  },

  childViewEvents: {
    'start:search': 'startTimer'
  },

  onRender() {
    const nameFilter = new NameFilter(this.collection);
    const time = new TimeModel();

    this.showChildView('form', new FormView({
      model: new FormModel(),
      collection: nameFilter
    }));
    this.showChildView('person', new PersonList({
      collection: nameFilter,
      model: time
    }));
    this.showChildView('time', new TimerView({
      model: time
    }));
  },

  startTimer() {
    const peopleList = this.getRegion('person');
    peopleList.currentView.startTimer();
  }
});
