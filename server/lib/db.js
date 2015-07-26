import config from '../config'

import lowdb from 'lowdb'
import { join } from 'path'
import monk from 'monk'
import wrap from 'co-monk'

let low = lowdb(join(__dirname, `../${ config.DATADIR }/db.json`))
let mongo = monk(config.MONGODB)

export default {
  mongo,
  low,
  usersDb: wrap(mongo.get('users')),
  appsDb: low('apps'),
  appsDisabledDb: low('apps-disabled'),
  stripeDb: low('stripe'),
  deploysDb: low('deploys')
}
