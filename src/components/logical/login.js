import { Form, Email, Password } from '../elements/'
import Api from '../api'



/**
 * Login Account
 */
Api.login = data => {
  return axios({ method: 'post', url: '/login', data })
    .then(res => res, err => ({ err }))
}

/**
 * Create Account
 */
Api.register = data => {
  return axios({ method: 'post', url: '/register', data })
    .then(res => res, err => ({ err }))
}


async function onLogin (action, { email, password, password2 } ) {
  let isNoob = (action == 'register')
  let clumsyNoob = (isNoob && password != password2)

  if (clumsyNoob)
    return { error: "Passwords do not match." };

  let { data, err } = (isNoob ? await Api.register({email, password}) : await Api.login({email, password}))

  if (err) {
    return { error: ({error='Could not reach Klouds.io!'}=err)};
  }

  Api.setAuthToken(data.token);
  return { done: true };
}


export let Register = {
  render(component, setState) {
    let {state, props} = component

    function on(ev) { return (e,c,s) => setState(props.on(ev, { })) }

    return <Form>
        <h4>Email</h4>
        <Email class="email" />
        <h4>Password</h4>
        <Password class="password" />
        <h4> Confirm Password </h4>,
        <Password class="password2" /> ,
        <input onClick={on("register")} type="button" class="register-btn" value="Register" />
     </Form>
  }
}


export let Login = {
  render(component, setState) {
    let {state, props} = component

    function on(ev) { return (e,c,s) => setState(props.on(ev, { })) }

    return <Form>
        <h4>Email</h4>
        <Email class="email" />
        <h4>Password</h4>
        <Password class="password" />
        <input type="hidden" class="password2" value="" /> ,
        <input onClick={on("login")} type="button" class="login-btn primary" value="Login" />
     </Form>
  }
}



export default Login;