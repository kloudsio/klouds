import unruly from 'unruly'

import lowdb from 'lowdb'
import redis from 'then-redis'

let low = lowdb(unruly.lowdb)
let redisClient = redis.createClient({
	host: unruly.redis_host,
	user: unruly.redis_user,
	password: unruly.redis_pass,
})

export default {
  redis: redisClient,
  stripe: low('stripe'),
  deploys: low('deploys')
}
