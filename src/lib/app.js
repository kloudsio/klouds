require('babelify/polyfill')

import { tree, render, element } from 'deku'
import api from './api'
import Page from '../elements/page'

/*
	App + Config
*/

let app = tree();

app.set('stripe_pk', process.env.STRIPE_PK);


app.set('setUser', function (user) {
	app.set('user', user);
});

app.set('showPurchase', show);


app.set('fetchApps', api.fetchApps);
app.set('sendLogin', api.sendLogin);
app.set('sendRegister', api.sendRegister);
app.set('sendPurchase', api.sendPurchase);

/*
	Make Render Tree
*/


app.mount(<Page />);

render(app, document.querySelector('main'));

export default {
	app: app
};