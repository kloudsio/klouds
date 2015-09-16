import unruly from 'unruly'
import db from '../../lib/db'
import assert from 'assert'
import createPswd from 'pswd'
import jwt from 'koa-jwt'

let pswd = createPswd()

/**
 * Access Token - jwt signs a user object
 */
function userToken(user) {
  return jwt.sign(user, unruly['jwt_key'], { expiresInMinutes: 60 * 5 })
}

/**
 * Login User
 */
async function loginUser({ email, password }) {
  let target = await (
    db.redis.hgetall(`user-${email}`)
  )
  assert(target, 'Incorrect Email or Password')

  let passOk = await (
    pswd.compare(password, target.hash)
  )
  assert(passOk, 'Incorrect Email or Password')

  delete target.hash
  return target;
}

/**
 * Create User
 */
async function createUser({ email, password }) {
  let existing = await (
    db.redis.hgetall(`user-${email}`)
  )
  assert(!existing, 'User already exists')

  let hash = await (
    pswd.hash(password)
  )
  let user = await (
    db.redis.hmset(`user-${email}`, { email, hash })
  )
  delete user.hash
  return user;
}

/**
 * Routes
 */
export default {
  * login() {
    let user = yield loginUser(this.request.body)
    let token = userToken(user)
    this.body = { user, token }
  },

  * register() {
    let user = yield createUser(this.request.body)
    let token = userToken(user)
    this.body = {
      user,
      token
    }
  }
}
