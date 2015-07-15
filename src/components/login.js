import { element } from 'deku'

import Api from '../api'
import Form from './form'


let login = async function() {

}

function submit({ email, password, password2 }) {
  // validation
  //// is email an email?

  //// passwords match
}

async function login(email, password) {

  Api.login({email, password})
    .then(response => {
      let { data } = response
      Api.setAuthToken(data.token)
      setState({user: response.data})
    })
    .catch(err => {
    setState({error: err.error})
  })
}

let Login = {
  render(component) {
    let {state, props} = component

    return <Form onSubmit={submit} class="login">
        <h4>Email</h4>
        <input type="email" id="EMAIL"/>
        <h4>Password</h4>
        <input type="password" class="password" />
        <input type="submit" class="login-btn primary" value="Login" />
     </Form>
  }
}

export default Login
