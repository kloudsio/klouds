import { element } from 'deku'
import Form from '../frames/form'



let Register = {
  render(component) {
    let {state, props} = component

    return <Form>
        <h4>Email</h4>
        <input type="email" class="email" />
        <h4>Password</h4>
        <input type="password" class="password" />
        <h4> Confirm Password </h4>
        <input type="password" class="password2" />
        <input type="button" class="register-btn" value="Register" />
     </Form>
  }
}

export default Register
