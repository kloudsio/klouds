import config from '../config'

import low from 'lowdb'
import { join } from 'path'
import monk from 'monk'
import wrap from 'co-monk'

let apps = join(config.DATADIR, 'apps.json')
let stripe = join(config.DATADIR, 'stripe.json')
let userApps = join(config.DATADIR, 'user-apps.json')

let db = monk(config.MONGODB)

export default {
  appsDb: low(apps),
  stripeDb: low(stripe),
  userAppsDb: low(userApps),
  usersDb: wrap(db.get('users')),
}
