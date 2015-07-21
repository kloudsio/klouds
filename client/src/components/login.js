import { element } from 'deku'
import Form from './form'
import api from '../api'

let Login = {
  render(component) {
    let { state, props } = component

    async function login({ email, password }, c, update) {
      try {
        let { data } = await api.login({ email, password })
        api.setAuthToken(data.token)
        props.done(data.user)
      } catch (e) {
        return update({ error: e.data.error })
      }
    }


    return <Form onSubmit={login} class="form" title="Login">
      <h4>Email</h4>
      <input autofocus type="email" class="email"/>
      <h4>Password</h4>
      <input type="password" class="password" />
      <button type="submit" class="login-btn primary">Login</button>
    </Form>
  }
}

export default Login
