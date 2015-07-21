import conf from './rancher-config.json'
import commandify from './lib/commandify'

import {join} from 'path'

function app(name) {
  let options = conf.options
  options.cwd = join(__dirname, name)
  return commandify(conf.bin, conf.commands, options)
}



export let run = app
export let wordpress = app('wordpress')
