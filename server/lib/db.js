import unruly from 'unruly'

import lowdb from 'lowdb'
import redis from 'then-redis'

let low = lowdb(unruly.lowdb)
let redisClient = redis.createClient(unruly.redis)

export default {
  redis: redisClient,
  stripe: low('stripe'),
  deploys: low('deploys')
}
