import {Collection} from 'backbone';

import {NameModel} from './models';

export const NameCollection = Collection.extend({
  model: NameModel
});
