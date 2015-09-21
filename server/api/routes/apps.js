//READS THE FOLDER WITH THE NAME O FTHE VARIABLE PASSED IN LINE 7, "let list = fs.readdirSync(unruly['apps'])"

import fs from 'fs'
import path from 'path'
import unruly from 'unruly'

let appsDir = path.join(__dirname, unruly['apps'])
let apps = fs.readdirSync(appsDir).map(x => ({ name: x }))

function* apps() {
  this.body = apps
}

function* disabled() {
}

export default { apps, disabled }
