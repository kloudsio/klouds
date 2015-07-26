import axios from 'axios'

let tokenInterceptor = axios.interceptors.request.use(res => {
  if (res.data.token) {
    api.token = res.data.token
    api.headers.Authorization = `Bearer ${res.data.token}`
    axios.interceptors.request.eject(tokenInterceptor)
  }
  return res
})


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

  subscribe: ({ app, source }) => axios({
    method: 'post',
    url: '/subscribe',
    headers: api.headers,
    data: { app, source }
  })
}


export default api
