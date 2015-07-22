import users from './users'
import apps from './apps'
import stripe from './stripe'
import config from '../config'

import http from 'http'
import koa from 'koa'
import json from 'koa-json'
import router from 'koa-joi-router'
import serve from 'koa-static'
import { join } from 'path'

function failure(failed) {
  console.error(failed.stack)
}

let app = koa()
app.on('error', failure)

// public routes
let pub = router()
pub.route(users.login)
pub.route(users.register)
pub.get('/apps', apps.apps)
pub.get('/disabled', apps.disabled)

// user routes
let user = router()
user.post('/subscribe', { validate: { type: 'json' } }, stripe.subscribe)


// serve directory & json response & 404s
app.use(function* errors(next) {
  try {
    yield next
  } catch (err) {
    this.status = err.status || 500
    this.body = {
      error: err.message
    }
    this.app.emit('error', err, this)
  }
})
app.use(serve(config.WWWROOT, { defer: false }))
app.use(json())

app.use(pub.middleware())
app.use(user.middleware())




// Start Listening
http.createServer(app.callback()).listen(config.PORT)

console.log('\n' + `serving klouds from ${config.PORT}`)

