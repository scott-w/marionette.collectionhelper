import _ from 'underscore';
import {Model} from 'backbone';
import Elapsed from 'elapsed';

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

export const TimeModel = Model.extend({
  defaults: {
    startTime: null,
    endTime: null
  },

  calculateElapsed() {
    const {startTime, endTime} = this.pick('startTime', 'endTime');
    if (_.isNull(startTime) || _.isNull(endTime)) {
      return '';
    }
    const elapsed = new Elapsed(startTime, endTime)
    return elapsed.milliSeconds.num;
  }
});
