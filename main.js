#!/bin/babel-node

import unruly from 'unruly'
import koa from 'koa'
import serve from 'koa-static'
import path from 'path'

let wwwroot = path.join(__dirname, unruly.apps)
let app = koa()

app.use(serve(wwwroot))

app.listen(
  unruly.www_port,
  () => console.log(`www served on port ${unruly.www_port}`
))

import api from './server/lib/app'
api.listen(
  unruly.api_port,
  () => console.log(`api server started ${unruly.api_port}`
))
