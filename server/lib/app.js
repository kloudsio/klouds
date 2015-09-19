import routes from '../api'
import events from './events'

import koa from 'koa'
import cors from 'kcors'

let app = koa()

app.use(cors())
app.on('error', f => console.error(f.stack))

app.use(function* errors(next) {
  try {
    yield next
  } catch (err) {
    this.status = err.status || 500
    this.body = { error: err.message }
    this.app.emit('error', err, this)
  }
})

routes(app)


app.on('subscribe', events.subscribe)


export default app