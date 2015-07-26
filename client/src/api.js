import axios from 'axios'


let api = {
  token: null,
  headers: {},
  http: axios,

  login: data => axios({ method: 'post', url: '/login', data }),
  register: data => axios({ method: 'post', url: '/register', data }),

  apps: () => axios({
    method: 'get',
    url: '/apps'
  }),

  disabledApps: () => axios({
    method: 'get',
    url: '/disabled'
  }),

  subscribe: (app, source) => axios({
    method: 'post',
    url: '/subscribe',
    headers: api.headers,
    data: { app, source }
  })
}

let setToken = token => {
  api.token = token
  api.headers.Authorization = `Bearer ${token}`
}

let authInterceptor = res => {
  if (res.data && res.data.token) {
    setToken(res.data.token)
  }
  return res
}

axios.interceptors.response.use(authInterceptor)


export default api
