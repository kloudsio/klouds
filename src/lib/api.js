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
Api.login = data => axios({
  method: 'post',
  url: '/login',
  data
})

/**
 * Create Account
 */
Api.register = data => axios({
  method: 'post',
  url: '/register',
  data
})

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
