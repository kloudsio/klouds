import { appsDb, stripeDb } from './db'
import config from '../config'
import deploys from './deploys'
import jwt from 'koa-jwt'
import Stripe from 'stripe'
import Emitter from 'event'

let emitter = new Emitter();

let stripe = Stripe(config.STRIPE_SK)

/**
 * customer is a promisified wrapper for stripe.customers.create
 */
function createCustomer(info) {
  return new Promise((resolve, reject) => {
    let cb = (err, data) => err ? reject(err) : resolve(data)
      stripe.customers.create(info, cb)
    }
  )
}
function* subscribe() {
  // app exists
  let app = appsDb.find(this.request.body.app)
  this.assert(app, 404, `Incorrect app ${app}`)


  // stripe create customer
  let result = yield customer({
    plan: 'app',
    email: this.state.user.email,
    source: this.request.body.source,
    metadata: {
      app
    }
  })
  this.assert(result, 500, 'Stripe Create Customer Failure')

  // Save Customer
  stripeDb('customers').push(result)

  // broadcast
  emitter.emit('subscription', {
    app,
    payment: result.id,
    user: this.state.user
  })
  this.body = result.id
}

export default {
  subscribe,
  on: emitter.on
}
