import arg3r from 'minimist'
import env from './env.json'
import { join } from 'path'
import { spawn } from 'child_process'

let argv = arg3r(process.argv.slice(2))
let targets = argv._

console.log(`klouds-run on ${ targets.length } targets`)

function launch(name) {
  console.log('spawning:', name)

  let file = name + '.sh'
  let cwd = join(__dirname, `apps/${name}`)

  let cp = spawn('bash', [ file ], {
    cwd,
    env: {...env, ...process.env },
    stdio: 'inherit'
  })

  cp.stdout.on('data', function (data) {
    console.log(name + ': ' + data)
  })

  cp.stderr.on('data', function (data) {
    console.error(name + 'ERR! ' + data)
  })

  cp.on('close', function (code) {
    console.log('child process exited with code ' + code)
  })
}

targets.map(launch)
