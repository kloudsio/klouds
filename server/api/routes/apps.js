import fs from 'fs'

let list = fs.readdirSync('../../apps')

function* apps() {
  this.body = list
}

function* disabled() {
}

export default { apps, disabled }
