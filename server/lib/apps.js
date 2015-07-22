import { low } from './db'

function* apps() {
  this.body = low('apps').toArray()
}

function* disabled() {
  this.body = low('disabled').toArray()
}

export default { apps, disabled }
