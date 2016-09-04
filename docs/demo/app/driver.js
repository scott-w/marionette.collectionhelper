import Mn from 'backbone.marionette';

import {NameCollection} from './collections';
import {MainView} from './views';

const app = new Mn.Application({
  region: '#root',

  onStart() {
    const region = this.getRegion();
    const collection = new NameCollection([
      {name: 'Sarah'}, {name: 'Steve'}, {name: 'Helen'}, {name: 'Harry'}
    ]);

    region.show(new MainView({collection: collection}));
  }
});

app.start();
