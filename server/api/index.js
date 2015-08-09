import spec from './spec'
import users from './routes/users'
import apps from './routes/apps'
import stripe from './routes/stripe'
import config from '../config'

import scheme from 'koa-scheme'
import route from 'koa-route'
import jsonbody from 'koa-json-body'
import jwt from 'koa-jwt'



export default app => {
  let wire = (x, y) => app.use(y)
  let GET = (str, handler) => app.use(route.get(str, handler))

  GET `/path ${users.login}`

  wire`${jsonbody()}`
  wire`${scheme(spec)}`
  wire`${route.post('/login', users.login)}`
  wire`${route.post('/register', users.register)}`
  wire`${route.get('/apps', apps.apps)}`
  wire`${route.get('/disabled', apps.disabled)}`
  wire`${jwt({ secret: config.JWT_KEY })}`
  wire`${route.post('/subscribe', stripe.subscribe)}`
}
