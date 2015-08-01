/**
 * Wrapper for rancher-compose command.
 */
import config from '../config'

import {join} from 'path'
import {exec} from 'child_process'


let logProcess = (err, stdout, stderr) => {
  console.log(stdout)
  console.error(stderr)
  if (err !== null) {
    console.error('exec err: ' + err)
  }
}

/**
 * Returns a function(cmd) to control the apps at path
 * path: folder name
 * returns: a closure like fn(up|down|restart)
 */
function loadApp(path) {
  let options = {
    cwd: join(__dirname, path)
  }

  return {
    up: exec.apply(`rancher-compose ${config.rancher} ${'up -d'}`, options, logProcess),
    down: exec.apply(`rancher-compose ${config.rancher} ${'down'}`, options, logProcess),
    restart: exec.apply(`rancher-compose ${config.rancher} ${'restart'}`, options, logProcess)
  }
}

export default {
  wordpress: loadApp('./wordpress'),
}

