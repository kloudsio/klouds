import spec from './spec'
import users from './routes/users'
import apps from './routes/apps'
import stripe from './routes/stripe'

import scheme from 'koa-scheme'
import route from 'koa-route'
import compose from 'koa-compose'

let routes = [
  scheme(spec),
  route.post('/login', users.login),
  route.post('/register', users.register),
  route.get('/apps', apps.apps),
  route.get('/disabled', apps.disabled),
  users.auth,
  route.post('/subscribe', stripe.subscribe)
]

export default () => compose(routes)
