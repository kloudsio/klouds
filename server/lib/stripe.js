import { appsDb, stripeDb } from './db'
import config from '../config'
import deploys from './deploys'
import jwt from 'koa-jwt'
import Stripe from 'stripe'
import { EventEmitter } from 'events'

let emitter = new EventEmitter()

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

  let app = appsDb.find({
    name: this.request.body.app
  })

  this.assert(app, 404, `Invalid parameter as app: ${app}`)

  // stripe create customer
  let result = yield createCustomer({
    source: this.request.body.source,
    email: this.state.user.email,
    plan: 'app',
    metadata: {
      app,
      user: this.state.user._id
    }
  })

  this.assert(result, 500, 'Stripe Create Customer Failure')

  // Save Customer
  stripeDb('customers').push(result)

  // Broadcast subscription
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
