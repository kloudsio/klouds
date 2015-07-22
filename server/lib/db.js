import config from '../config'

import low from 'lowdb'
import { join } from 'path'
import monk from 'monk'
import wrap from 'co-monk'

let data = join(config.DATADIR, './db.json')
let db = monk(config.MONGODB)

export default {
  usersDb: wrap(db.get('users')),
  appsDb: low(data)('apps'),
  stripeDb: low(data)('stripe'),
  deploysDb: low(data)('deploys'),
}
