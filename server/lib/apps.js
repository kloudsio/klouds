import { appsDb, appsDisabledDb } from './db'


function* apps() {
  this.body = appsDb.toArray()
}

function* disabled() {
  this.body = appsDisabledDb.toArray()
}

export default { apps, disabled }
