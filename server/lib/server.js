import config from '../config'
import routes from '../api'
import rancher from './rancher'

import koa from 'koa'
import cors from 'kcors'

let app = koa()

// api stuff
app.on('error', f => console.error(f.stack))
app.use(cors())
app.use(function* errors(next) {
  try {
    yield next
  } catch (err) {
    this.status = err.status || 500
    this.body = { error: err.message }
    this.app.emit('error', err, this)
  }
})

// add routes
routes(app)

// event handlers
app.on('subscribe', rancher.create)

// Start Listening
console.log('\n' + ` klouds api listening on port ${config.PORT}`)
app.listen(config.PORT)
