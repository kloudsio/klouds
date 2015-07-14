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

    return <Form onSubmit={submit}>
        <h4>Email</h4>
        <input type="email" id="EMAIL"/>
        <h4>Password</h4>
        <input type="password" class="password" />
        <input type="submit" class="login-btn primary" value="Login" />
     </Form>
  }
}

let login = async function() {

}

let submit = function(data) {
  console.log(data);
}

export default Login
