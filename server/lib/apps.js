let { PORT, MONGODB, ASSETS, JWT_KEY, STRIPE_SK } = process.env

import low from 'lowdb'
let appsDb = low('apps.json')

function* apps() {
  this.body = appsDb('disabled')
}

function* disabled() {
  this.body = appsDb('apps')
}

export default { apps, disabled }
