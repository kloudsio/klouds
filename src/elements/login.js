import { element } from 'deku'
import Relay from '../lib/relay.js'

let is = require('is_js')

const name = 'Login'

export let login = Relay.create()
export let register = Relay.create()

function initialState (props) {
  return {
    message: '',
  }
}


function render(c, setState) {
  let { props, state } = c;

  return <form class="login">
    <span class="error">{state.message}</span>
    <h4>Email</h4>
  	<input id="email" type="email" />
    <h4>Password</h4>
    <input id="password" type="password" />
    <h4>Confirm Password</h4>
    <input id="password2" type="password" />
    <button class="register-btn" onClick={register.go} type="button">Register</button>
    <button class="login-btn primary" onClick={login.go} type="button">Login</button>
  </form>

}

function afterRender(c, el) {
  c.data = () => ({
    email: el.querySelector('#email').value,
    password: el.querySelector('#password').value,
  })
}

export default { name, propTypes, initialState, render, afterRender }