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

function createToken(data) {
  return new Promise((resolve, reject) => {
    Stripe.card.createToken(data, function (status, res) {
      if (res.error) {
        reject(res.error)
      } else if (status !== 200) {
        reject('Unable to reach klouds.io')
      } else {
        resolve(res)
      }
    })
  })
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

    async function pay(formdata) {
      try {
        let res = await createToken(formdata)
        let { data } = api.subscribe({app: props.id, source: res.id})
        props.done(data)
      } catch (e) {
        return setState({ error: e })
      }



      setState({ busy: false })
    }


    return <Form onSubmit={pay} class="form" id="stripe">
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