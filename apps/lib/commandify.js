import { spawn } from 'child_process'
import extend from 'extend'

let Commandify = function (cmd, funcs, defaults = {}) {
  let fns = {};
  for (let func of funcs) {
    fns[func] = x => spawn(`${cmd} ${func}`, extend(defaults, x))
  }
  return fns
}

export default Commandify
