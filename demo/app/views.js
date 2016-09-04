import {CollectionView, View} from 'backbone.marionette';

import {NameFilter} from './filters';

import person from './templates/person.html';
import main from './templates/main.html';


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
    person: '.person-hook'
  },

  onRender() {
    const nameFilter = new NameFilter(this.collection);
    this.showChildView('person', new PersonList({
      collection: nameFilter
    }));
  }
});
