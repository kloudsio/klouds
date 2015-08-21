import config from '../../config'
import db from '../../lib/db'

import jwt from 'koa-jwt'
import createPswd from 'pswd'


let pswd = createPswd()

function authtoken(user) {
  return jwt.sign(user, config.JWT_KEY, { expiresInMinutes: 60 * 5 })
}

function* login() {
  let { email, password } = this.request.body

  let user = yield redis.get(`user-${email}`)
  this.assert(user, 401, 'Incorrect Email or Password')

  let valid = yield pswd.compare(password, user.password)
  this.assert(valid, 401, 'Incorrect Email or Password')
  delete user.password

  let token = authtoken(user)

  this.body = { user, token }
}

function* register() {
  let { email, password } = this.request.body
  // check duplicate
  let duplicate = yield redis.get(`user-${email}`)
  this.assert(!duplicate, 400, 'Klouds ID already exists')
  // set user
  let hash = yield pswd.hash(password)
  let user = yield redis.set(`user-${email}`, {
    email,
    password: hash
  })
  // create auth token
  let token = authtoken(user)
  this.body = { user, token }
}

export default {
  login,
  register
}
