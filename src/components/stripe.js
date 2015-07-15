import { element } from 'deku'
import Debug from './debug'

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

let formData = () => ({
  number: document.getElementById('card-number').value,
  cvc: document.getElementById('card-cvc').value,
  'exp_month': document.getElementById('card-expiry-month').value,
  'exp_year': document.getElementById('card-expiry-year').value
})

async function purchase(event, c, setState) {
  let { props, state } = c

  setState({ busy: true })
  let data = formData()

  let res = await fetchToken(data)
  if (!res) {
    return setState({ error: res.error.message })
  }

  props.onToken(props.payment.id, res.id)
  setState({ busy: false })

}

let TestButton = {
  render: c => <Debug>
    <button type="button" onClick={() => {
      document.getElementById('card-number').value = '4242424242424242'
      document.getElementById('card-cvc').value = '121'
      document.getElementById('card-expiry-month').value = '12'
      document.getElementById('card-expiry-year').value = '2020' }}>
      Test-Card
    </button>
  </Debug>
}

let Stripe = {

  defaultProps: {
    id: null,
    amount: null,
    name: 'Payment'
  },

  initialState() {
    return {
      busy: false,
      error: ''
    }
  },

  render(c) {
    let { props, state } = c

    return (
      <form class="stripe-form modal" action="#" id="payment-form">
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
        <button class={{'stripe-busy': state.busy}} onClick={purchase} type="button">Purchase</button>
      </form>
      )
  }
}
export default Stripe