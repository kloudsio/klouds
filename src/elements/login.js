import { element } from 'deku';
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

function getFormData (component) {
  let { email, password } = component;
  return {
    email: email.value,
    password: password.value,
  };
}

async function onRegister (ev, component, setState) {
  let { props } = component;
  let body = getFormData(component);

  try {
    let response = await props.sendRegister(body);
    props.setUser(response.token);
  } catch (err) {
      setState({ message: getErrorMessage(err) });
  }
}

async function onLogin (ev, component, setState) {
  let { props } = component;
  let body = getFormData(component);

  try {
    let response = await props.sendLogin(body);
    props.setUser(response.token);
  } catch (err) {
    setState({ message: getErrorMessage(err) });
  }
}

const propTypes = {
  sendLogin: {
    source: 'sendLogin'
  },
  sendRegister: {
    source: 'sendRegister'
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


function render(component, setState) {
  let { props, state } = component;

  return <form class="login">
    <span class="error">{ state.message }</span>
    <h4>Email</h4>
  	<input onInput={ function () { } } type="email" />
    <h4>Password</h4>
    <input onInput={ function () { } } type="password" />
    <h4>Confirm Password</h4>
    <input onInput={ function () { } } type="password" />
    <button class="register-btn" type="button" disabled={ false } onClick={ onRegister }>Register</button>
    <button class="login-btn primary" type="button" disabled={ false } onClick={ onLogin }>Login</button>
  </form>

}

function afterRender(component, el) {
  component.email = el.querySelector('input[type=email]');
  component.password = el.querySelector('input[type=password]');
}

export default { name, propTypes, initialState, render, afterRender }