require('babelify/polyfill')

import { tree, render, element } from 'deku'
import api from './api'
import config from './config'
import { Landing } from '../elements/page'

/*
  App + Config
*/

let app = tree();

app.use(config);
app.use(api);

app.use(function data(_app) {
  _app.set('onLogin', function (user) {
    _app.set('user', user);
  });
});

app.mount(<Landing />);

render(app, document.querySelector('main'));
