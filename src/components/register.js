import { element } from 'deku'
import Form from './form'
import api from '../api'


let Register = {
  render(component) {
    let { props, state } = component

    async function register({ email, password, password2 }, c, update) {
      if (password !== password2) {
        return update({ error: 'Passwords do not match.' })
      }

      try {
        let { data } = await api.register({ email, password })
        api.setAuthToken(data.token)
        props.done(data.user)
      } catch (e) {
        return update({ error: e.data.error })
      }
    }



    return <Form onSubmit={register} class="form" title="Register">
      <h4>Email</h4>
      <input type="email" class="email" name="email"/>
      <h4>Password</h4>
      <input type="password" class="password" name="password"/>
      <h4> Confirm Password </h4>
      <input type="password" class="password2" name="password2"/>
      <button type="submit" class="register-btn">Register</button>
     </Form>
  }
}


export default Register
