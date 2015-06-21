'use strict';
import api from './api'

import { element, tree, render } from 'deku'
import assert from 'assert'
import Login from '../src/elements/login.js'

describe('app', () => {
  it('should render', () => {

    const app = tree(<Login />)
    render(app, document.body);
    assert(document.body.querySelector('form.login'), 'Login not null');
  });
});