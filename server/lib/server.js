import koa from 'koa'
import json from 'koa-json'
import serve from 'koa-static'

import config from '../config'
import routes from '../routes'
import rancher from './rancher'

function failure(failed) {
  console.error(failed.stack)
}

let app = koa()
app.on('error', failure)

// serve directory & json response & 404s
app.use(function* (next) {
  try {
    yield next
  } catch (err) {
    this.status = err.status || 500
    this.body = { error: err.message }
    this.app.emit('error', err, this)
  }
})

app.use(serve(config.WWWROOT, { defer: false }))
app.use(json())

app.use(routes)

import stripe from './stripe'

stripe.onSubscribe(rancher.create)

console.log('\n' + `serving klouds from ${config.PORT}`)

// Start Listening
app.listen(config.PORT)


