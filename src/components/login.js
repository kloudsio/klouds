import { element } from 'deku'
import Form from './form'
import api from '../api'


async function login({ email, password }, update) {

  let { data, err } = await api.login({ email, password })

  if (err) {
    console.error(err)
    update({ error: err.error })
  }

  api.setAuthToken(data.token)

  update({data})
}

let Login = {
  render(component) {
    let {state, props} = component

    return <Form process={login} class="form">
      <h3>Login</h3>
      <h4>Email</h4>
      <input type="email" class="email"/>
      <h4>Password</h4>
      <input type="password" class="password" />
      <button type="submit" class="login-btn primary">Login</button>
    </Form>
  }
}

export default Login
