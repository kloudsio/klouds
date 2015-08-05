import config from '../../config'
import db from '../../lib/db'

import jwt from 'koa-jwt'
import createPswd from 'pswd'


let pswd = createPswd()

function sign(user) {
  return jwt.sign(user, config.JWT_KEY, { expiresInMinutes: 60 * 5 })
}

function* login() {
  console.dir(this.request.body)
  let { email, password } = this.request.body

  let user = yield db.users.findOne({ email })
  this.assert(user, 401, 'Incorrect Email or Password')

  let valid = yield pswd.compare(password, user.password)
  this.assert(valid, 401, 'Incorrect Email or Password')
  delete user.password

  let token = sign(user)

  this.body = { user, token }
}

function* register() {
  let { email, password } = this.request.body

  let duplicate = yield db.users.findOne({ email })
  this.assert(!duplicate, 400, 'Klouds ID already exists')

  let hash = yield pswd.hash(password)
  this.assert(hash, 500, 'Failed to hash password')

  let user = yield db.users.insert({
    email,
    password: hash
  })
  this.assert(user, 500, 'Failed to insert new user')
  delete user.password

  let token = sign(user)

  this.body = { user, token }
}

export default {
  login,
  register,
  auth: jwt({ secret: config.JWT_KEY })
}

