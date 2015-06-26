import { element } from 'deku'
import { Email, Password, Button } from '../include/fields'

let is = require('is_js')

var Emitter = require('component-emitter')

let Login = {
  name: 'Login',

  afterMount(c, el, setState) {
      let emitter = new Emitter();

      emitter.on('register', c.props.onRegister);
      emitter.on('login', c.props.onLogin);
      setState({
        onRegister: function(ev, c, setState) {
          emitter.emit('register', c.state.getData(), setState)
        },
        onLogin: function(ev, c, setState) {
          emitter.emit('login', c.state.getData(), setState)
        },
        getData: function() {
          return {
            email: el.querySelector('.email').value,
            password: el.querySelector('.password').value,
            password2: el.querySelector('.password2').value,
          };
        }
      })
  },

  render(c, setState) {
    let { props, state } = c;

    let error = state.error ? <span class="error">{state.error}</span> : '';

    let loginStuff = [
      <input onClick={state.onLogin}
        type="button"
        class="login-btn primary"
        value="Login" />
    ]

    let registerStuff = [
      <h4>Confirm Password</h4>,
      <Password class="password2" />,
      <input onClick={state.onRegister}
        type="button"
        class="register-btn"
        value="Register" />
    ]

    return <form class="login">
      <h3>Login</h3>
      {error}
      <h4>Email</h4>
      <Email class="email"/>
      <h4>Password</h4>
      <Password class="password"/>
      {props.type == "register" ? registerStuff : loginStuff}
    </form>

  }
}


/**
 * Mixin `Emitter`.
 */

Emitter(Login)

export default Login;
