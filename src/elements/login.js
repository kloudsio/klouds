import { element } from 'deku'
import { Email, Password } from '../include/fields'

let is = require('is_js')

function on(action) {
  return (e,c,s) => s(c.props.on(action, c.state.getData()))
}

let Login = {

  initialState(props) {
    return {
      getData: () => {},
    }
  },
  render(c, setState) {
    let { props, state } = c;
    let errors = state.error ? <span class="error">{state.error}</span> : '';

    let elements = props.noob ? [
      <h4> Confirm Password </h4>,
      <Password class="password2" /> ,
      <input onClick={on("register")} type="button" class="register-btn" value="Register" />
    ] : [
      <input type="hidden" class="password2" value="" /> ,
      <input onClick={on("login")} type="button" class="login-btn primary" value="Login" />
    ]

    return <form class="login">
        {errors}
        <h4>Email</h4>
        <Email class="email" />
        <h4>Password</h4>
        <Password class="password" />
        {elements}
      </form>
  },
  afterMount(c, el) {
    return {
      getData: () => ({
        email: el.querySelector('.email').value,
        password: el.querySelector('.password').value,
        password2: el.querySelector('.password2').value,
      })
    }
  }

}

export default Login;