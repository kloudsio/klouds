import config from '../config'

import lowdb from 'lowdb'
import redis from 'then-redis'

let low = lowdb(config.lowdb)
let redisClient = redis.createClient(config.redis)

export default {
  redis: redisClient,
  stripe: low('stripe'),
  deploys: low('deploys')
}
