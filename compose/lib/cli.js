#!/bin/babel-node

import parseArgs from 'minimist'
import compose from './compose'
import command from './command'

let [ app, cmd ] = parseArgs(process.argv.slice(2))._

let context = compose(app, cmd, (err, out) => console.log(err, out))
