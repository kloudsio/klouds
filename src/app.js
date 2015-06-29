import config from './config'
import { tree, render, element } from 'deku'
import { Landing } from './components/layout.js'

window.element = element;

let app = tree();

app.set(config);

app.mount(<Landing />);

render(app, document.querySelector('main'));
