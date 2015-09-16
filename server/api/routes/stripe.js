import config from 'unruly'
import db from '../../lib/db'
import stripe from 'stripe'


let client = stripe(config['stripe_sk'])

/**
 * customer is a promisified wrapper for stripe.customers.create
 */
function createCustomer(info) {
  return new Promise((resolve, reject) => {
    let cb = (err, data) => err ? reject(err) : resolve(data)
    client.customers.create(info, cb)
  })
}

/**
 * User sends us a stripe token, subscribes to an application
 */
function* subscribe() {
  let user = this.state.user
  let app = this.request.body.app
  let token = this.request.body.source

  let customerData = {
    plan: config['stripe_plan'],
    email: user.email,
    source: token,
    metadata: {user: user.id, app}
  }

  let customer = yield createCustomer(customerData)

  // save
  db.stripe.push(customer)

  // Broadcast subscription
  this.app.emit('subscribe', user, app)

  this.body = {
    app,
    customer: {
      id: customer.id
    }
  }
}

export default { subscribe }
