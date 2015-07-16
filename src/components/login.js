import { element } from 'deku'
import Form from './form'
import api from '../api'


async function login({ email, password }, c, update) {

  try {
    let { data } = await api.login({ email, password })
  } catch (e) {
    return update({ error: e.data.error })
  }

  api.setAuthToken(data.token)
  return update({ done: true })
}

let Login = {
  render(component) {
    let {state, props} = component

    return <Form process={login} class="form" title="Login">
      <h4>Email</h4>
      <input type="email" class="email"/>
      <h4>Password</h4>
      <input type="password" class="password" />
      <button type="submit" class="login-btn primary">Login</button>
    </Form>
  }
}

export default Login
