require('babelify/polyfill');

import { tree, render, element } from 'deku'
import config from './config'
import { Landing } from '../elements/page'

/*
  App + Config
*/

let app = tree();

app.set(config);

app.set('setUser', function (user) {
  app.set('user', user);
});


app.mount(<Landing />);

render(app, document.querySelector('main'));
