#!/bin/babel-node

import unruly from 'unruly'
import koa from 'koa'
import serve from 'koa-static'

let debug = require('debug')('main')

let app = koa()
app.use(function*(){
  this.header('klouds-api-endpoint', unruly.hostname + ':' api_port)
})
app.use(serve(unruly['client']))
app.listen(unruly['www_port'], () => console.log(`file server started ${unruly['www_port']}`))

import api from './server/lib/app'
api.listen(unruly['api_port'], () => console.log(`api server started ${unruly['api_port']}`))
