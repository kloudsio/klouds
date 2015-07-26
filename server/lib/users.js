import { usersDb } from './db'
import config from '../config'

import jwt from 'koa-jwt'
import createPswd from 'pswd'
import joi from 'joi'


let pswd = createPswd()

function sign(user) {
  return jwt.sign(user, config.JWT_KEY, { expiresInMinutes: 60 * 5 })
}

let login = {
  validate: {
    body: {
      email: joi.string().lowercase().email(),
      password: joi.string().max(100)
    },
    type: 'json'
  },
  * handler() {
    let { email, password } = this.request.body

    let user = yield usersDb.findOne({ email })
    this.assert(user, 401, 'Incorrect Email or Password')

    let valid = yield pswd.compare(password, user.password)
    this.assert(valid, 401, 'Incorrect Email or Password')
    delete user.password

    let token = sign(user)

    this.body = { user, token }
  }
}

let register = {
  validate: {
    body: {
      email: joi.string().lowercase().email(),
      password: joi.string().max(100)
    },
    type: 'json'
  },
  * handler() {
    let { email, password } = this.request.body

    let duplicate = yield usersDb.findOne({ email })
    this.assert(!duplicate, 400, 'Klouds ID already exists')

    let hash = yield pswd.hash(password)
    this.assert(hash, 500, 'Failed to hash password')

    let user = yield usersDb.insert({
      email,
      password: hash
    })
    this.assert(user, 500, 'Failed to insert new user')
    delete user.password

    let token = sign(user)

    this.body = { user, token }
  }
}

export default {
  login,
  register,
  auth: jwt({ secret: config.JWT_KEY })
}

