import axios from 'axios'

let token = null
let headers = {}
let apiroot = process.env.APIROOT
//
// Intercept Auth Tokens
//
axios.interceptors.response.use(res => {
  if (res.data && res.data.token) {
    token = res.data.token
    headers.Authorization = `Bearer ${token}`
  }
  return res
})

//
// HTTP Verbs
//
let iox = method =>
  ([url], options) =>
    data => axios({url: `${apiroot}${url}`, data, ...options, method })

let GET = iox('GET')
let POST = iox('POST')



let routes = {
  login: POST`/login`,
  register: POST`/register`,
  apps: GET`/apps`,
  disabledApps: GET`/disabled`,
  subscribe: POST`/subscribe ${{headers}}`
}

export default {
  apiroot,
  token,
  headers,
  ...routes
}
