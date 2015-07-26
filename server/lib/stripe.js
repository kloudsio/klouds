import config from '../config'
import { appsDb, stripeDb } from './db'

import stripeApi from 'stripe'
import { EventEmitter } from 'events'


let stripe = stripeApi(config.STRIPE_SK)
let events = new EventEmitter()

/**
 * customer is a promisified wrapper for stripe.customers.create
 */
function createCustomer(info) {
  return new Promise((resolve, reject) => {
    let cb = (err, data) => err ? reject(err) : resolve(data)
    stripe.customers.create(info, cb)
  })
}

function* subscribe() {
  let { email, userId } = this.state.user
  let { app, source } = this.request.body


  // stripe create customer
  let result = yield createCustomer({
    plan: 'app',
    email,
    metadata: { app, userId },
    source
  })

  this.assert(result, 500, 'Stripe Create Customer Failure')

  // Save Customer
  stripeDb.push(result)

  // Broadcast subscription
  events.emit('subscribe', {
    app,
    payment: result.id,
    user: this.state.user
  })

  this.body = result.id
}

export default {
  subscribe,
  on: events.on
}
