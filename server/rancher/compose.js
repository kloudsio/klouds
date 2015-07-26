/**
 * Wrapper for rancher-compose command.
 */

import extend from 'extend'
import { join } from 'path'
import { spawn } from 'child_process'

import config from '../config'

/**
 * Creates an interface for an app
 * app('wordpress')
 */
function appCompose(path) {
  let spawnOptions = extend(config.rancher, {
    cwd: join(__dirname, path)
  })
  console.dir(spawnOptions)
  let composeCmd = cmd => () => spawn(`rancher-compose`, [ cmd ], spawnOptions)
  return {
    up: composeCmd('up'),
    down: composeCmd('down'),
    restart: composeCmd('restart')
  }
}

export default {
  wordpress: appCompose('./wordpress')
}
