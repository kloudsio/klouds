import { appsDb } from './db'

function* apps() {
  this.body = this.body = appsDb('apps').toArray()
}

function* disabled() {
  this.body = appsDb('disabled').toArray()
  console.log(this.body.apps)

}

export default {
  apps,
  disabled,
}
