/**
 * Wrapper for rancher-compose command.
 */

import extend from 'extend'
import {join} from 'path'
import {exec} from 'child_process'

import {rancher} from '../config'


/**
 * Run rancher-compose
 */
function compose(options) {
  function log(err, stdout, stderr) {
    console.log(stdout)
    console.error(stderr)
    if (err !== null) {
      console.error('exec err: ' + err)
    }
  }
  return subcommand => () => exec(`rancher-compose ${rancher} ${subcommand}`, options, log)
}

/**
 * Creates an interface for an app
 * app('wordpress')
 */
function appInterface(path) {
  let options = {
    cwd: join(__dirname, path)
  }
  let appCompose = compose(options)
  return {
    up: appCompose('up -d'),
    down: appCompose('down'),
    restart: appCompose('restart')
  }
}

export default {
  wordpress: appInterface('./wordpress')
}
