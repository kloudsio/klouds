import { login, register, apps, pay} from './api'
import { element, tree, render } from 'deku'
import assert from 'assert'

describe('app', () => {
  it('should create an account', () => {
    const email = 'test@gmail.com';
    const password = '6f6f6f';
    const app = tree(<div />)


  	register(email, password).then((res) => {
      console.log(res);
  		assert(res.token, 'should have a user token');
  	}).catch((err) => {
      console.log(err);
  		assert(false, err);
  	})
  });
  	// login({email, password});
  	// apps();
  	// pay()
});
