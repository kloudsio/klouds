import { element } from 'deku';
import { api } from '../lib/api';
let is = require('is_js');

const name = 'Login';

function getErrorMessage(err) {
  const errors = {
    400: 'Invalid Login',
    401: 'Incorrect Login',
    403: 'That User Already Exists',
    404: 'Could Not Connect',
    500: 'Internal Server Failz. Sorry',
  };

  if (typeof errors[err.status] !== 'undefined') {
    return errors[err.status]
  }

  return `Login Error: ${err.statusText}`;
}

function getFormData (c) {
  let { email, password } = c;
  return {
    email: email.value,
    password: password.value,
  };
}

function onRegister (ev, c, setState) {
  let { props } = c;
  let data = getFormData(c);

  props.api.register(data)
    .then(res => props.setUser(res.token))
    .catch(err => setState({ message: getErrorMessage(err) }));
}

function onLogin (ev, c, setState) {
  let { props } = c;
  let data = getFormData(c);

  props.api.login(data)
    .then(res => props.setUser(res.token))
    .catch(err => setState({ message: getErrorMessage(err) }));
}

const propTypes = {
  api: {
    source: 'api'
  },
  setUser: {
    source: 'setUser'
  }
};

function initialState (props) {
  return {
    errors: {},
    message: '',
  }
}


function render(c, setState) {
  let { props, state } = c;

  return <form class="login">
    <span class="error">{ state.message }</span>
    <h4>Email</h4>
  	<input type="email" />
    <h4>Password</h4>
    <input id="password" type="password" />
    <h4>Confirm Password</h4>
    <inpu id="password2" type="password" />
    <button class="register-btn" type="button" disabled={ false } onClick={ onRegister }>Register</button>
    <button class="login-btn primary" type="button" disabled={ false } onClick={ onLogin }>Login</button>
  </form>

}

function afterRender(c, el) {
  c.email = el.querySelector('input[type=email]');
  c.password = el.querySelector('input#password');
  c.password2 = el.querySelector('input#password2');
}

export default { name, propTypes, initialState, render, afterRender }