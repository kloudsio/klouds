/*
 * Multi-Page Base Layout
 * Login -> Select App -> Payment -> Dashboard
 */

import { element } from 'deku'

import NumText from './components/num-text'
import Row from './components/grid-row'
import Col from './components/grid-col'

import Login from './components/login'
import Debug from './components/debug'
import Paypal from './templates/paypal'
import Stripe from './components/stripe'

import LogoText from './components/logo-text'
import Register from './components/register'
import Apps from './components/apps'
import Dashboard from './components/dashboard'
import Forkme from './components/github'

import api from './api'


let Layout = {

  initialState() {
    return {
      page: 'login',
      app: {}
    }
  },

  render(c, update) {
    let { props, state } = c

    let navigation = {
      login: () => update({ page: 'login' }),
      apps: () => update({ page: 'apps' }),
      payment: app => update({ page: 'payment', app }),
      dashboard: () => update({ page: 'dashboard' }),
    }

    function onStripeCustomer(token) {
      try {
        let { data } = api.subscribe(state.app.name, token)
        console.log(data)
        navigation.dashboard()
      } catch(e) {
        console.error(e)
      }
    }

    return (
      <ul class="page">
        <Forkme repo="https://github.com/kloudsio/klouds" />

        <li class={{ active: state.page === 'login', landing: true }}>
          <Row>
            <Col xs="12 center"><LogoText>Klouds.io</LogoText></Col>
            <Col xs="12 center"><h1>Web Applications For All.</h1></Col>
          </Row>
          <Row>
            <Col xs="6"><Login done={navigation.apps} /></Col>
            <Col xs="6"><Register done={navigation.apps} /></Col>
          </Row>
        </li>

        <li class={{ active: state.page === 'apps' }}>
          <NumText left="">Browse Apps</NumText>
          <Row>
            <Col xs="8 2"><Apps onLaunch={navigation.payment} /></Col>
          </Row>
        </li>

        <li class={{ active: state.page === 'payment' }}>
          <NumText left="">Checkout</NumText>
          <Row>
            <Col xs="6 3"><Stripe onToken={onStripeCustomer} title={state.app.name} amount="10"/></Col>
          </Row>
        </li>

        <li class={{ active: state.page === 'dashboard' }}>
          <NumText left="">Dashboard</NumText>
          <Dashboard />
        </li>

        <Debug>
          <button onClick={navigation.login}>LOGIN</button>
          <button onClick={navigation.apps}>APPS</button>
          <button onClick={navigation.payment}>PAYMENT</button>
          <button onClick={navigation.dashboard}>DASHBOARD</button>
        </Debug>
      </ul>
    )
  }
}

export default Layout
