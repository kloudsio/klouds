import fs from 'fs'
import path from 'path'

let list = fs.readdirSync(path.join(__dirname, '../../apps'))

function* apps() {
  this.body = list
}

function* disabled() {
}

export default { apps, disabled }
