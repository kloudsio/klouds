import config from './config.json'
import { join } from 'path'
import { spawn } from 'child_process'
import extend from 'extend'

let commandify = function (cmd, funcs, defaults = {}) {
  let fns = {};
  for (let func of funcs) {
    fns[func] = x => spawn(`${cmd} ${func}`, extend(defaults, x))
  }
  return fns
}


function app(name) {
  let options = config.options
  options.cwd = join(__dirname, name)
  return commandify(config.bin, config.commands, options)
}

export let run = app
export let wordpress = app('wordpress')
