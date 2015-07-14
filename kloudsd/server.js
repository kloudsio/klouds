let { PORT, MONGODB, ASSETS, JWT_KEY, STRIPE_SK } = process.env

import { join } from 'path'
import createStripe from 'stripe'
import createPswd from 'pswd'
import monk from 'monk'
import wrap from 'co-monk'
import Joi from 'joi'
import koa from 'koa'
import json from 'koa-json'
import router from 'koa-joi-router'
import jwt from 'koa-jwt'
import serve from 'koa-static'

let stripe = createStripe(STRIPE_SK)
let pswd = createPswd()
let auth = jwt({ secret: JWT_KEY })

let db = monk(MONGODB)
let appsDb = wrap(db.get('apps'))
let usersDb = wrap(db.get('users'))
let stripeDb = wrap(db.get('stripe'))

let app = koa()

app.use(json())

/**
 * Serve Client Directory
 */
app.use(serve(join(__dirname, ASSETS), { defer: false }))


/**
 * Error Response
 */
app.use(function* errors(next) {
  try {
    yield next
  } catch (err) {
    console.error(err)

    this.status = err.status || 500
    this.body = {
      error: err.message
    }
    this.app.emit('error', err, this)
  }
})



function authorize(user) {
  delete user.password
  return {
    token: jwt.sign(user, JWT_KEY, { expiresInMinutes: 60 * 5 }),
    user
  }
}



let noAuth = router()
noAuth.route({
  method: 'post',
  path: '/login',
  validate: {
    body: {
      email: Joi.string().lowercase().email(),
      password: Joi.string().max(100)
    },
    type: 'json'
  },
  * handler() {
    let { email, password } = this.request.body

    let user = yield usersDb.findOne({ email })
    this.assert(user, 401, 'Incorrect Email or Password')

    let valid = yield pswd.compare(password, user.password)
    this.assert(valid, 401, 'Incorrect Email or Password')

    this.body = authorize(user)

  }
})
noAuth.route({
  method: 'post',
  path: '/register',
  validate: {
    body: {
      email: Joi.string().lowercase().email(),
      password: Joi.string().max(100)
    },
    type: 'json'
  },
  * handler() {
    let { email, password } = this.request.body

    let duplicate = yield usersDb.findOne({ email })
    this.assert(!duplicate, 400, 'Klouds ID already exists')

    let hash = yield pswd.hash(password)
    this.assert(hash, 500, 'Failed to hash password')

    let user = yield usersDb.insert({
      email,
      password: hash
    })
    this.assert(user, 500, 'Failed to insert new user')

    this.body = authorize(user)
  }
})

noAuth.route({
  method: 'get',
  path: '/apps',
  * handler() {
    this.body = yield appsDb.find({ disabled: { '$exists' : false }})
  }
})

noAuth.route({
  method: 'get',
  path: '/disabled',
  * handler() {
    this.body = yield appsDb.find({ disabled: true })
  }
})

app.use(noAuth.middleware())


/*                          You Shall Not Pass!                       */
// AUTH AUTH AUTH AUTH AUTH |UTH AUTH AUTH AUT| AUTH AUTH AUTH AUTH AUTH

app.use(auth)

// AUTH AUTH AUTH AUTH AUTH |UTH AUTH AUTH AUT| AUTH AUTH AUTH AUTH AUTH


function stripeCustomerCreate(customer) {
  return cb => stripe.customers.create(customer, cb)
}

let user = router()
user.route({
  method: 'post',
  path: '/subscribe',
  validate: { type: 'json' },
  handler: [
    auth,
    function*() {

      let { app, tok } = this.request.body

      let customer = yield stripeCustomerCreate({
        source: tok,
        plan: 'web_application',
        email: this.state.user.email
      })
      this.assert(customer, 500, 'Stripe Create Customer Failure')
      console.log('Stripe Customer', customer)

      yield stripeDb.insert(customer)

      this.body = {
        customer: customer.id
      }
    }
  ]
})

app.use(user.middleware())

console.log(`Listening on port ${PORT}`)
app.listen(PORT)
