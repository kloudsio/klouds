import { join } from 'path'
import Command from './command'
import config from '../config'


const args = `\
  --url "${config.url}" \
  --project-name ${config.projectname} \
  --access-key ${config.accesskey} \
  --secret-key ${config.secretkey}`

const commands = {
  create: 'create',
  up: 'up -d',
  start: 'start',
  logs: 'logs',
  restart: 'restart',
  stop: 'stop',
  down: 'down',
  scale: 'scale',
  rm: 'rm',
  upgrade: 'upgrade',
}

let compose = new Command('rancher-compose')
let appPath = app => join(config.base, app)

export default (app, command, cb) => {
  if (typeof commands[command] === 'undefined')
    throw new Error('Invalid command ' + command)

  compose.bind({
    args: `${args} ${commands[command]}`,
    cwd: appPath(app),
    env: config.env,
  }).run(cb)
}
