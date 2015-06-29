import axios from 'axios'


let Api = {
  token: null,
  headers: {},
  http: axios,
};

/**
 * setAuthToken authorizes future calls using an API token.
 */
Api.setAuthToken = token => {
  Api.token = token;
  Api.headers.Authorization = `Bearer ${token}`;
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
 * Purchase App
 */
Api.payment = data => axios({
  method: 'post',
  url: '/payment/',
  headers: Api.headers,
  data: data
})


export default Api;