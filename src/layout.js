import { element } from 'deku'
import api from './api'
import lodash from 'lodash'
import LogoText from './components/logo-text'
import Paypal from './templates/paypal'
import Stripe from './components/stripe'


let Layout = {

  initialState() {
    return {
      page: 1
    }
  },

  render(c, update) {
    let { props, state } = c

    // let setpage = x => update({page: x})
    // let formToggle = () => { update({page: page}) }
    // let onLogin = () => { update({page: page}) }


    return (
      <div class="page">
        <LogoText>Klouds.io</LogoText>
        <Paypal />
        <Stripe />
      </div>
    )
  }
}

export default Layout
