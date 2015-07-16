import { element } from 'deku'
import Debug from './debug'
import Form from './form'
import api from '../api'


function fetchToken(data) {



}

async function submit(data, c, update) {
  update({ busy: true })
  Stripe.card.createToken(data, function (status, res) {
    if (res.error) {
      update({ error: res.error })
    } else if (status !== 200) {
      update({ error: 'Unable to reach klouds.io' })
    } else {
      c.props.onPurchased(c.props.id, res.id)
      update({ busy: false })
    }
  })
}

let Payment = {
  initialState() {
    return {
      busy: false
    }
  },

  render(c, update) {
    let { props, state } = c

    return (
      <Form process={submit} class="form">
        <h3>{props.name}</h3>
        <span class="info">{`\$${props.amount} per Month`}</span>

        <h4>Card Number</h4>
        <input placeholder="credit card #" type="text" size="20" id="card-number" />

        <h4>CVC</h4>
        <input placeholder="" type="text" size="4" id="card-cvc"/>

        <h4>Expiration (MM/YYYY)</h4>
        <div>
          <input placeholder="MM" class="expiry" type="text" size="2" id="card-expiry-month"/>
          {'/'}
          <input placeholder="YYYY" class="expiry" type="text" size="4" id="card-expiry-year"/>
        </div>

        <TestButton />
        <input type="submit" class="login-btn primary stripe-busy" value="Purchase" />
      </Form>
      )
  }
}

let TestButton = {
  render() {
    function fill() {
      let val = (y,z) => { document.getElementById(y).value = z }
      val('card-number', '4242424242424242')
      val('card-cvc', '121')
      val('card-expiry-month', '12')
      val('card-expiry-year', '2020')
    }
    return <Debug>
      <button type="button" onClick={fill}>
        Test-Card
      </button>
    </Debug>
  }
}

export default Payment