import jwt from 'koa-jwt'
import low from 'lowdb'
import createStripe from 'stripe'

import { stripeDb } from '../db'

let { PORT, MONGODB, ASSETS, JWT_KEY, STRIPE_SK } = process.env

let stripe = createStripe(STRIPE_SK)
let hasToken = jwt({ secret: JWT_KEY })

function stripeCustomerCreate(customer) {
  return cb => stripe.customers.create(customer, cb)
}

let subscribe = {
  method: 'post',
  path: '/subscribe',
  validate: { type: 'json' },
  handler: [ hasToken, function*() {

    let { app, source } = this.request.body
    let { email } = this.state.user
    let plan = 'app'

    let customer = yield stripeCustomerCreate({ plan, source, email })
    this.assert(customer, 500, 'Stripe Create Customer Failure')

    console.log('Created Stripe Customer', customer)

    stripeDb('customers').push(customer)

    this.body = customer.id

  }]
}

export default { subscribe }
