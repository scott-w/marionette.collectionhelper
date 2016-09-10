import _ from 'underscore';
import Mn from 'backbone.marionette';

import {NameCollection} from './collections';
import {MainView} from './views';

const App = Mn.Application.extend({
  region: '#root',

  onStart() {
    const region = this.getRegion();
    const collection = new NameCollection(this.nameList());

    const view = new MainView({collection: collection});
    region.show(view);
  },

  nameList() {
    return _.map([
      'Arlene', 'Alesia', 'Jacquelin', 'Britney', 'Christia', 'Jospeh', 'Maire',
      'Irish', 'Rachael', 'Clemmie', 'Nickolas', 'Jestine', 'Josefina', 'Toi',
      'Lise', 'Ramonita', 'Urlrike', 'Harrison', 'Raymon', 'Tawana', 'Sirena',
      'Tisha', 'Christopher', 'Carolyn', 'Tyrone', 'Adella', 'Lionel',
      'Faustino', 'Fermina', 'Breanne', 'Arnette', 'Cody', 'Mei', 'Katrice',
      'Maricela', 'Illuminada', 'Kathern', 'Rita', 'Vernice', 'Dustin',
      'Delcie', 'Noah', 'Reyna', 'Clora', 'Stanton', 'Alphonso', 'Temika',
      'Marcella', 'Dolores', 'Marguerita', 'Sarah', 'Steve', 'Helen', 'Harry',
      'Glendora', 'Huey', 'Christen', 'Reva', 'Leticia', 'Jacki', 'Cody',
      'Annalisa', 'Doug', 'Delphia', 'Shalanda', 'Cathrine', 'Annice', 'Nicola',
      'Barb', 'Una', 'Annita', 'Darwin', 'Therese', 'Isela', 'Jayna', 'Evelyne',
      'Cherly', 'Harland', 'Myrtis', 'Evonne', 'Rema', 'Nicolle', 'Oretha',
      'Alena', 'Bertha', 'Cesar', 'Minna', 'Astrid', 'Diedra', 'Krystin',
      'Nanci', 'Arden', 'Mitchell', 'Marguerita', 'Breanne', 'Emiko', 'Alisia',
      'Lashaunda', 'Cecily', 'Yan', 'Simone', 'Alyse', 'Anya', 'Marquis'],
      name => ({name: name}));
  }
});

const app = new App();
app.start();
