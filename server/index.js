#!/bin/babel-node


/**
 * Environment Variables Validation
 */
var env = [ 'PORT', 'MONGODB', 'ASSETS', 'JWT_KEY', 'STRIPE_SK' ]

env.map(function (v) {
  if (typeof process.env[v] === 'undefined') {
    throw 'Missing Environment Variable: ' + v
  }
  console.log(v, process.env[v])
})


require('./lib/server.js')
