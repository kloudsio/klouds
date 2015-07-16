import { element } from 'deku'

import Form from './form'
import api from '../api'

async function register({ email, password, password2 }) {

  if (password !== password2) {
    return { error: 'Passwords do not match.' }
  }

  let { data, err } = await api.register({email, password})
  if (err) {
    console.error(err)
    return { error: err.error }
  }

  api.setAuthToken(data.token)
  return data
}

let Register = {
  render({state, props}) {
    return <Form process={register} class="form">
      <h3>Register</h3>
      <h4>Email</h4>
      <input type="email" class="email" name="email"/>
      <h4>Password</h4>
      <input type="password" class="password" name="password"/>
      <h4> Confirm Password </h4>
      <input type="password" class="password2" name="password2"/>
      <input type="submit" class="register-btn" value="Register" />
     </Form>
  }
}


export default Register
