import config from '../config'
import routes from '../api'
import rancher from './rancher'

import koa from 'koa'
import json from 'koa-json'
import serve from 'koa-static'

let app = koa()

app.on('error', f => console.error(f.stack))

function* errors(next) {
  try {
    yield next
  } catch (err) {
    this.status = err.status || 500
    this.body = { error: err.message }
    this.app.emit('error', err, this)
  }
}


app.use(errors)
app.use(serve(config.WWWROOT, { defer: false }))
app.use(json())
app.use(routes())



app.on('subscribe', rancher.create)

// Start Listening
console.log('\n' + `serving klouds from ${config.PORT}`)
app.listen(config.PORT)


