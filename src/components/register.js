import { element } from 'deku'
import Form from './form'




async function register(email, password) {
  let { data, err } = await Api.register({email, password})
  if (err) {
    console.error(err);
    return { error: err.error }
  }

  Api.setAuthToken(data.token)
  return {  }
}

let Register = {
  render(component) {
    let {state, props} = component

    return <Form onSubmit={register           }>
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
