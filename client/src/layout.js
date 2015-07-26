import { element } from 'deku'

import Debug from './components/debug'
import LogoText from './components/logo-text'
import Paypal from './templates/paypal'
import Stripe from './components/stripe'
import Apps from './components/apps'
import Dashboard from './components/dashboard'
import Login from './components/login'
import Register from './components/register'
import NumText from './components/num-text'
import Row from './components/grid-row'
import Col from './components/grid-col'


let Layout = {

  initialState() {
    return {
      page: 'login',
      app: {},
    }
  },

  render(c, update) {
    let { props, state } = c

    let login = () => update({ page: 'login' })
    let apps = () => update({ page: 'apps' })
    let dashboard = () => update({ page: 'dashboard' })

    function loggedIn(user) {
      console.log(user)
      apps()
    }

    function payment(app) {
      update({ page: 'payment', app })
    }
    function purchased(name, tok) {
      console.log(name, tok)
    }


    return (
      <ul class="page">
        <LogoText>Klouds.io</LogoText>
        <Debug><button onClick={login}>LOGIN</button><button onClick={apps}>APPS</button><button onClick={payment}>PAYMENT</button><button onClick={dashboard}>DASHBOARD</button></Debug>
        <li class={{ active: state.page === 'login' }}>
          <NumText left="">Open Klouds</NumText>
          <Row>

            <Col xs="4 2">
              <Login done={loggedIn} />
            </Col>
            <Col xs="4">
              <Register done={loggedIn} />
            </Col>
          </Row>
        </li>

        <li class={{ active: state.page === 'apps' }}>
          <NumText left="">Browse Apps</NumText>
            <Row>
              <Col xs="8 2">
                <Apps onLaunch={payment} />
            </Col>
          </Row>
        </li>

        <li class={{ active: state.page === 'payment' }}>
          <NumText left="">Checkout</NumText>
            <Row>
              <Col xs="6 3">
                <Stripe done={() => {dashboard(); alert('you bought an app!') }} id={state.app.id} name={state.app.name} amount="1000"/>
            </Col>
          </Row>
        </li>

        <li class={{ active: state.page === 'dashboard' }}>
          <NumText left="">Dashboard</NumText>
          <Dashboard />
        </li>

      </ul>
    )
  }
}

export default Layout
