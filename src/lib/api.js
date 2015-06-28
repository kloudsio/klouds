import axios from 'axios'


let Api = {};

/**
 * Authorization Header
 */
let Authorization = '';
Api.setAuthToken = token => {
  Authorization = `Bearer ${token}`;
}

/**
 * List Applications
 */
Api.apps = () => axios({
  method: 'get',
  url: '/apps'
})

/**
 * List Applications
 */
Api.disabledApps = () => axios({
  method: 'get',
  url: '/disabled',
})

/**
 * Login Account
 */
Api.login = data => {
  return axios({ method: 'post', url: '/login', data })
    .then(res => res, err => ({ err }))
}

/**
 * Create Account
 */
Api.register = data => {
  return axios({ method: 'post', url: '/register', data })
    .then(res => res, err => ({ err }))
}

/**
 * Purchase App
 */
Api.payment = data => axios({
  method: 'post',
  url: '/payment/',
  headers: {
    Authorization
  },
  data
})


export default Api;
