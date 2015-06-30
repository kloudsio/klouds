import { element } from 'deku'

// import Api from '../../api'

// async function onLogin(action, { email, password, password2 } ) {
//   let isNoob = (action === 'register')
//   let clumsyNoob = (isNoob && password !== password2)

//   if (clumsyNoob) {
//     return { error: 'Passwords do not match.' }
//   }

//   let { data, err } = (isNoob ? await Api.register({email, password}) : await Api.login({email, password}))

//   if (err) {
//     return { error: err.error || 'Could not reach Klouds.io!' }
//   }

//   Api.setAuthToken(data.token)
//   return { done: true }
// }


import Form from '../frames/form'

let Login = {
  render(component) {
    let {state, props} = component

    return <Form>
        <h4>Email</h4>
        <input type="email" class="email" />
        <h4>Password</h4>
        <input type="password" class="password" />
        <input type="button" class="login-btn primary" value="Login" />
     </Form>
  }
}

export default Login
