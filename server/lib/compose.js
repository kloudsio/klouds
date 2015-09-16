import unruly from 'unruly'

import { join } from 'path'
import { exec } from 'child_process'

const args = `\
  --url "${unruly['rancher_url']}" \
  --project-name ${unruly['rancher_project_name']}\
  --access-key ${unruly['rancher_access_key']}\
  --secret-key ${unruly['rancher_secret_key']}`

const commands = [
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

let fd1 = console.log
let fd2 = console.error

let pipeExecStdio = (err, stdout, stderr) => {
  fd1(stdout)
  fd2(stderr)
  if (err !== null) {
    fd2('exec err: ' + err)
  }
}

function context(path) {
  let all = {}
  let composeCommands = (...x) => () => exec(...x)
  for (let [name, cmd] of commands) {
    all[name] = composeCommands(`rancher-compose ${args} ${cmd}`, { path }, pipeExecStdio)
  }

  return all
}

export default context