import users from './lib/users'
import apps from './lib/apps'
import stripe from './lib/stripe'
import router from 'koa-joi-router'
import compose from 'koa-compose'


let guest = router()
guest.post('/login', users.login)
guest.post('/register', users.register)
guest.get('/apps', apps.apps)
guest.get('/disabled', apps.disabled)


let user = router()
user.post('/subscribe', stripe.subscribe)

let routes = compose([
  guest.middleware(),
  users.auth,
  user.middleware()
])

export default routes

