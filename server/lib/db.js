import config from '../config'

import lowdb from 'lowdb'
import { join } from 'path'
import monk from 'monk'
import wrap from 'co-monk'

const lowData = join(__dirname, '..', config.DATADIR, 'db.json')
let mongo = monk(config.MONGODB)
let low = lowdb(lowData)

export default {
  users: wrap(mongo.get('users')),
  apps: low('apps'),
  disabled: low('apps-disabled'),
  stripe: low('stripe'),
  deploys: low('deploys')
}
