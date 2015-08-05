/**
 * Wrapper for rancher-compose command.
 */
import config from './config'
import {join} from 'path'
import {exec} from 'child_process'

const args = `--url "${config.url}" \
  --project-name ${config.projectname} \
  --access-key ${config.accesskey} \
  --secret-key ${config.secretkey}`

const mapping = [
  ['create', 'create'],
  ['up', 'up -d' ],
  ['start', 'start' ],
  ['logs', 'logs' ],
  ['restart', 'restart' ],
  ['stop', 'stop' ],
  ['down', 'down' ],
  ['scale', 'scale' ],
  ['rm', 'rm' ],
  ['upgrade', 'upgrade' ]
]

function attach(err, stdout, stderr) {
  console.log(stdout)
  console.error(stderr)
  if (err !== null) {
    console.error('exec err: ' + err)
  }
}

function commands(path) {
  let all = {}
  let cwd = join(__dirname, path)
  let defer = (...x) => () => exec(...x)
  for (let [name, cmd] of mapping) {
    all[name] = defer(`rancher-compose ${args} ${cmd}`, { cwd }, attach)
  }

  return all
}

export default {
  wordpress: commands('./wordpress')
}
