import { element } from 'deku'


function getStripeToken(data) {
  let deferred = Promise.defer()

  // Stripe.card.createToken(data, function (status, res) {
  //   if (res.error || status < 200 || status > 300 )
  //     return deferred.reject(res)

  //   deferred.resolve(res)

  // })

  return deferred
}

async function submit(event, c, setState) {
  let { props, state } = c

  let data = {
    number: document.getElementById('card-number').value,
    cvc: document.getElementById('card-cvc').value,
    'exp_month': document.getElementById('card-expiry-month').value,
    'exp_year': document.getElementById('card-expiry-year').value
  }

  setState({ busy: true })

  let res = await getStripeToken(data)
  if (!res) {
    return setState({ error: res.error.message })
  }

  props.onToken(props.payment.id, res.id)
  setState({ busy: false })

}

let Stripe = {
  initialState() {
    return {
      busy: false,
      error: ''
    }
  },
  render(c) {
    let { props, state } = c

    let { id, amount, name } = typeof props.payment !== 'undefined' ? props.payment : {}

    let buttonClass = {
      'stripe-busy': state.busy
    }

    let style = {
      visibility: props.payment ? 'visible' : 'hidden'
    }

    return (
      <div style={style} class="backdrop">
      <form class="stripe-form modal" method="POST" id="payment-form">
        <span class="title">{name}</span>
        <span class="info">{`\$${amount} per Month`}</span>
        <span class="stripe-errors">{state.error}</span>

        <label>Card Number</label>
        <input placeholder="credit card #" type="text" size="20" id="card-number" />

        <label>CVC</label>
        <input placeholder="" type="text" size="4" id="card-cvc"/>

        <label>Expiration (MM/YYYY)</label>
        <div>
          <input placeholder="MM" class="expiry" type="text" size="2" id="card-expiry-month"/>
          <span>/</span>
          <input placeholder="YYYY" class="expiry" type="text" size="4" id="card-expiry-year"/>
        </div>
        <button class={buttonClass} onClick={submit} type="button">Purchase</button>
        <button class={buttonClass} style="color: grey" onClick={close} type="button">Cancel</button>
      </form>
      </div>
      )
  }
}
export default Stripe