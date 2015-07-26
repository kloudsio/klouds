import config from '../config'
import { appsDb, stripeDb } from './db'

import joi from 'joi'
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

let subscribe = {
  validate: {
    body: {
      app: joi.string().max(100),   // app-name
      source: joi.string().max(100) // customer token
    },
    type: 'json'
  },
  * handler() {
    let user = this.state.user,
      app = this.request.body.app,
      token = this.request.body.source
    let customerData = {
      plan: config.STRIPE_PLAN,
      email: user.email,
      source: token,
      metadata: {user: user.id, app}
    }

    let customer = yield createCustomer(customerData)

    // save
    stripeDb.push(customer)

    // Broadcast subscription
    events.emit('subscribe', user, app)

    this.body = {
      app,
      customer: {
        id: customer.id
      }
    }
  }
}

export default {
  subscribe,
  onSubscribe: handler => events.on('subscribe', handler)
}
