import config from '../../config'
import db from '../../lib/db'

import assert from 'assert'
import jwt from 'koa-jwt'
import createPswd from 'pswd'


let pswd = createPswd()

let userToken = function(user) {
  return jwt.sign(user, config.JWT_KEY, { expiresInMinutes: 60 * 5 })
}

let openUser = function*({ email, password }) {
  let user = yield db.redis.get(`user-${email}`)
  assert(user, 'User not found')

  let isOk = yield pswd.compare(password, user.hash)
  assert(isOk, 'Incorrect Email or Password')

  delete user.hash
  return user;
}

let createUser = function*({ email, password }) {
  let userAlreadyExists = yield db.redis.get(`user-${email}`)
  assert(!userAlreadyExists, 'User already exists')
  let hash = yield pswd.hash(password)
  let user = yield db.redis.set(`user-${email}`, { email, hash })
  delete user.hash
  return user;
}

export default {
  * login() {
    let user = yield openUser(this.request.body)
    let token = userToken(user)
    this.body = { user, token }
  },

  * register() {
    let user = yield createUser(this.request.body)
    let token = userToken(user)
    this.body = { user, token }
  }
}
