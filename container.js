#!/bin/babel-node

import unruly from 'unruly'
import koa from 'koa'
import serve from 'koa-static'
import api from './server/lib/app'

let debug = require('debug')('main')

let app = koa()

app.use(serve(unruly['client']))

app.listen(unruly['www_port'])
debug(`file server started ${unruly['www_port']}`)

api.listen(unruly['api_port'])
debug(`api server started ${unruly['api_port']}`)