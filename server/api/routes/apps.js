import fs from 'fs'
import path from 'path'
import unruly from 'unruly'

let list = fs.readdirSync(unruly['apps'])
	.map(x => ({ name: x }))

function* apps() {
  this.body = list
}

function* disabled() {
}

export default { apps, disabled }
