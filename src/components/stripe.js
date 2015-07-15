import { element } from 'deku'
import Debug from './debug'
import Form from './form'
import api from '../api'


function fetchToken(data) {
  var promise = new Promise()

  Stripe.card.createToken(data, function (status, res) {

    if (res.error) {
      promise.reject(res.error)
    } else if (status !== 200) {
      promise.reject('Connection lost')
    } else {
      promise.resolve(res)
    }
  })

  return promise
}

async function submit(data, { props }, update) {

  update({ busy: true })

  let res = await fetchToken(data)

  if (!res) {
    return update({ error: res.error.message })
  }

  props.onToken(props.payment.id, res.id)
  update({ busy: false })

}


let Stripe = {
  initialState() {
    return {
      busy: false
    }
  },

  render(c) {
    let { props, state } = c

    return (
      <Form submit={submit} class="login">
        <span class="title">{props.name}</span>
        <span class="info">{`\$${props.amount} per Month`}</span>

        <label>Card Number</label>
        <input placeholder="credit card #" type="text" size="20" id="card-number" />

        <label>CVC</label>
        <input placeholder="" type="text" size="4" id="card-cvc"/>

        <label>Expiration (MM/YYYY)</label>
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

export default Stripe