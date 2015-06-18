'use strict';
import { element, tree, render } from 'deku'
import assert from 'assert'
import Login from '../src/elements/login.js'

describe('app', () => {
  it('should render', () => {
    const HelloWorld = {
      render: function (c) {
        return <h1>{c.props.text}</h1>
      }
    }
    const app = tree(<HelloWorld text="Hello World!" />);
    render(app, document.body);
    assert.equal('Hello World!', document.body.querySelector('h1').innerText);

    app.mount(<Login />)
    render(app, document.body);
    assert(document.body.querySelector('form.login'), 'Login not null');
  });
});