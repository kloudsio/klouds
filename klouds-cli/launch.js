#!babel-node

import arg3r from 'minimist'
import env from './env.json'
import fs from 'fs'
import { join } from 'path'
import { spawn } from 'child_process'

let argv = arg3r(process.argv.slice(2))
let targets = argv._



console.log(`klouds-run on ${ targets.length } targets`)


function scriptPath(name) {
  return join(__dirname, `apps/${name}/${name}.sh`)
}

function launch(name) {
  let script = scriptPath(name)
  console.log('spawning:', script)

  let cp = spawn('bash', [script], {
    cwd: join(__dirname, 'apps', name),
    env,
    ...process.env
  })

  cp.stdout.pipe(process.stdout)
  cp.stderr.pipe(process.stderr)
  process.stdin.pipe(cp.stdin)

  cp.on('error', function (err) {
    console.error('Error executing launcher', script, err)
  })
}

function exists(x) {
  return new Promise((res, rej) => {
    fs.exists(scriptPath(x), mmhm => {
      if (mmhm) {
        return res(x)
      } else {
        rej(x)
      }
    })
  })
}


for (let name of targets) {
  let ex = scriptPath(name)
  exists(ex).then(launch).catch(console.error)
}

