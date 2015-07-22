#!/bin/babel-node

import axios from 'axios'
let { PORT=2020 } = process.env

let base = (suffix) => {
  console.log('http://localhost:' + PORT + suffix)
  return 'http://localhost:' + PORT + suffix
}
let ok = c => {
  let { status, data } = c
  console.log(status, data)
  return c
}

let fail = c => {
  // let { status, data } = c
  console.error(c)
}

let logindata = {
  email: 'test@klouds.io',
  password: 'testage occurs now'
}


let headers = {}


async function api() {
  try {

    // register
    await axios({ method: 'post', url: base`/register`, data: logindata }).catch(fail)

    // login
    let { data } = (await axios({ method: 'post', url: base`/login`, data: logindata }).then(ok, fail))

    headers.Authorization = `Bearer ${data.token}`

    await axios({ method: 'get', url: base`/apps` }).then(ok, fail)
    await axios({ method: 'get', url: base`/disabled` }).then(ok, fail)
    await axios({ method: 'post', url: base`/subscribe`, headers, data: {} }).then(ok, fail)

  } catch (e) {
    console.error(e)
  }
}
api()

// Purchase App
