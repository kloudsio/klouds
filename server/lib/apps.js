import { appsDb } from './db'

function* apps() {
  this.body = this.body = appsDb('apps').toArray()
}

function* disabled() {
  this.body = appsDb('disabled').toArray()

}

export default {
  apps,
  disabled,
}
