#!/bin/babel-node

/*
 * Script that verifies a running API
 */

import axios from 'axios'
let { PORT=2020 } = process.env

let x = route => 'http://localhost:' + PORT + route

let testPass = c => {
  let { status, data } = c
  console.log(status, data)
  return c
}

let testFail = c => console.error(c)

let testUser = {
  email: 'test@klouds.io',
  password: 'testage occurs now'
}



async function test() {
  try {
    // register
    await axios({
      method: 'post',
      url: x`/register`,
      data: testUser
    }).catch(testFail)

    // login
    let { data } = (await axios({
      method: 'post',
      url: x`/login`,
      data: testUser
    }).then(testPass, testFail))

    let headers = { Authorization: `Bearer ${data.token}` }

    // apps
    await axios({
      method: 'get',
      url: x`/apps`
    }).then(testPass, testFail)

    // disabled
    await axios({
      method: 'get',
      url: x`/disabled`
    }).then(testPass, testFail)

    // subscribe
    await axios({
      method: 'post',
      url: x`/subscribe`,
      headers,
      data: {

      }
    }).then(testPass, testFail)

  } catch (e) {
    console.error(e)
  }
}()
