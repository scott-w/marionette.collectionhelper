import {Model} from 'backbone';

export const NameModel = Model.extend({
  idAttribute: 'name',
  defaults: {
    name: 'John',
    surname: 'Smith'
  }
});

export const FormModel = Model.extend({
  defaults: {
    search: ''
  }
});
