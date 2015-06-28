import { tree, render, element } from 'deku'
import config from './config'
import { Landing } from '../pages/landing.js'


let app = tree();

app.set(config);

app.mount(<Landing />);

render(app, document.querySelector('main'));
