import { element } from 'deku'

import LogoText from './components/logo-text'
import Paypal from './templates/paypal'
import Stripe from './components/stripe'
import Apps from './components/apps'
import Dashboard from './components/dashboard'
import Login from './components/login'
import Register from './components/register'


let Layout = {

  initialState() {
    return {
      page: 'login'
    }
  },

  render(c, update) {
    let { props, state } = c

    let login = () => update({ page: 'login' })
    let apps = () => update({ page: 'apps' })
    let payment = () => update({ page: 'payment' })
    let dashboard = () => update({ page: 'dashboard' })

    return (
      <ul class="page">
        <LogoText onClick={open.bind(null, 'apps')}>Klouds.io</LogoText>
        <button onClick={login}>LOGIN</button>
        <button onClick={apps}>APPS</button>
        <button onClick={payment}>PAYMENT</button>
        <button onClick={dashboard}>DASHBOARD</button>
        <li class={{ active: state.page === 'login' }}>
          Open Klouds
          <Login />
        </li>

        <li class={{ active: state.page === 'apps' }}>
          Browse Apps
          <Apps />
        </li>

        <li class={{ active: state.page === 'payment' }}>
          Checkout
          <Paypal />
          <Stripe />
        </li>

        <li class={{ active: state.page === 'dashboard' }}>
          Dashboard
          <Dashboard />
        </li>

      </ul>
    )
  }
}

export default Layout
