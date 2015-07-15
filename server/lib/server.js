let { PORT, MONGODB, ASSETS, JWT_KEY, STRIPE_SK } = process.env

import http from 'http'
import koa from 'koa'
import json from 'koa-json'
import router from 'koa-joi-router'
import serve from 'koa-static'
import { join } from 'path'

let app = koa()

app.on('error', function (err) {
  console.log(`server error: ${ err }`);
});

app.use(serve(join(__dirname, '../', ASSETS), { defer: false }))

app.use(json())
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



let pub = router()
let auth = router()

import users from './users'
import apps from './apps'
import stripe from './stripe'

pub.route(users.login)
pub.route(users.register)
pub.get('/apps', apps.apps)
pub.get('/disabled', apps.disabled)

auth.route(stripe.subscribe)

pub.post('/paypal/hook', function* () {
  let data = this.request.body
  console.log(data)
  this.body = data
})

app.use(pub.middleware())
app.use(auth.middleware())


http.createServer(app.callback()).listen(PORT);

console.log('\n'+`serving klouds from ${PORT}`)

