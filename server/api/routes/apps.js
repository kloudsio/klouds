import db from '../../lib/db'


function* apps() {
  this.body = db.apps.toArray()
}

function* disabled() {
  this.body = db.disabled.toArray()
}

export default { apps, disabled }
