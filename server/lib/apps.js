import { appsDb } from '../db'

let { PORT, MONGODB, ASSETS, JWT_KEY, STRIPE_SK } = process.env

function* apps() {
  this.body = this.body = appsDb('apps').toArray()
  console.log(this.body.apps)
}

function* disabled() {
  this.body = appsDb('disabled').toArray()
  console.log(this.body.apps)

}

export default {
  apps,
  disabled,
  appsDb
}
