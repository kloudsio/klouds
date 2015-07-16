import { element } from 'deku'
import Debug from './debug'
import Form from './form'
import api from '../api'



let Mock = {
  render() {
    function fill() {
      let val = (y, z) => { document.querySelector(y).value = z }
      val('#stripe [name="number"]', '4242424242424242')
      val('#stripe [name="cvc"]', '121')
      val('#stripe [name="exp-month"]', '12')
      val('#stripe [name="exp-year"]', '2020')
    }
    return <Debug>
      <button type="button" onClick={fill}>
        Test-Card
      </button>
    </Debug>
  }
}


let Payment = {
  defaultProps: {
    name: '<3s',
    amount: 1000
  },

  initialState() {
    return {
      busy: false
    }
  },

  render(c, setState) {
    let { props, state } = c

    async function submit(data, c, update) {

      Stripe.card.createToken(data, function (status, res) {

        if (res.error) {
          setState({ error: res.error })
        } else if (status !== 200) {
          setState({ error: 'Unable to reach klouds.io' })
        } else {
          props.done(c.props.id, res.id)
          setState({ busy: false })
        }
      })
    }


    return <Form onSubmit={submit} class="form" id="stripe">
      <h3>{props.name}</h3>
      <span class="info">{`\$${props.amount} per Month`}</span>

      <h4>Card Number</h4>
      <input placeholder="credit card #" type="text" size="20" name="number" />

      <h4>CVC</h4>
      <input placeholder="" type="text" size="4" name="cvc"/>

      <h4>Expiration (MM/YYYY)</h4>
      <div>
        <input placeholder="MM" class="expiry" type="text" size="2" name="exp-month"/>
        {'/'}
        <input placeholder="YYYY" class="expiry" type="text" size="4" name="exp-year"/>
      </div>

      <button type="submit" class="login-btn primary">Purchase</button>
      <Mock />
    </Form>
  }
}

export default Payment