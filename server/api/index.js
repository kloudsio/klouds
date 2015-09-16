import unruly from 'unruly'

import users from './routes/users'
import apps from './routes/apps'
import stripe from './routes/stripe'

import scheme from 'koa-scheme'
import route from 'koa-route'
import jsonbody from 'koa-json-body'
import jwt from 'koa-jwt'

import validator from 'validator'

let spec = {
  '/(login|register)': {
    request: {
      method: 'POST',
      body: {
        email: validator.isEmail,
        password: /.{6,100}/
      },
      type: 'json'
    }
  },
  '/subscribe': {
    request: {
      method: 'POST',
      body: {
        app: str => validator.toString(str).length > 3,
        source: str => validator.toString(str).length > 3
      },
      type: 'json'
    }
  }
}


export default app => {
  let wire = (_, y) => app.use(y)
  let GET = (x,y) => app.use(route.get(x,y))

  GET `/path ${users.login}`

  wire`${jsonbody()}`
  wire`${scheme(spec)}`
  wire`${route.post('/login', users.login)}`
  wire`${route.post('/register', users.register)}`
  wire`${route.get('/apps', apps.apps)}`
  wire`${route.get('/disabled', apps.disabled)}`
  wire`${jwt({ secret: unruly['jwt_key'] })}`
  wire`${route.post('/subscribe', stripe.subscribe)}`
}
