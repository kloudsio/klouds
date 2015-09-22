#!/bin/babel-node

import unruly from 'unruly'
import api from './lib/app'

api.listen(unruly.api_port, 
	() => console.log(`api server started ${unruly.api_port}`
))

import koa from 'koa'
import serve from 'koa-static'

let app = koa()
app.use(serve(unruly.client))
app.listen(unruly.www_port, 
	() => console.log(`web server started ${unruly.www_port}`
))
