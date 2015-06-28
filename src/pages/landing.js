import { element } from 'deku'

import { Page, Row } from '../include/page'
import LogoText from '../elements/logo-text'
import Login from '../elements/login'
import Apps from '../elements/apps'
import AppsOff from '../elements/apps-off'
import Stripe from '../elements/stripe'

import Api from '../lib/api'

async function onLogin (action, { email, password, password2 } ) {
  let isNoob = (action == 'register')
  let clumsyNoob = (isNoob && password != password2)
  
  if (clumsyNoob) return { error: "Passwords do not match." };
  
  let { data, err } = (isNoob ? await Api.register({email, password}) : await Api.login({email, password}))
  
  if (err) {
    return { error: ({error='Could not reach Klouds.io!'}=err)};
  }
  
  Api.setAuthToken(data.token);
  return { done: true };
}



export let Landing = {
  initialState() {
    return {
      noob: true,
      appsOn: [],
      appsOff: [],
    }
  },
  async afterMount(c, el, setState) {
    try {
      let appsOn = await Api.apps()
      let appsOff = await Api.disabledApps()
      return {
        appsOn: appsOn.data,
        appsOff: appsOff.data
      }
    } catch (error) {
      return { error }
    }
  },
  render(component, setState) {
    let { props, state } = component;

    function openPurchase() {
      setState({ item: item });
    }

    function closePurchase() {
      setState({ item: null });
    }

    function noobSwitch(e) {
      setState({ noob: state.noob === false });
    }
    
    let loginProps = state.noob ? { onClick: noobSwitch, class: "inactive" } : {}
    let registerProps = !state.noob ? { onClick: noobSwitch, class: "inactive" } : {}

    return <Page>
      <LogoText>Klouds.io</LogoText>
      <Row n="1" text="Klouds Beta Accounts" complete={state.user} >
        <h3><span {...registerProps}>Register</span> <span class="inactive">or</span> <span {...loginProps}>Login</span></h3>
        <Login on={onLogin} noob={state.noob} />
      </Row>
      <Row n="2" text="Klouds ID">
        <Apps apps={state.appsOn} onPurchase={openPurchase}/>
      </Row>
      <Row n="3" text="Klouds ID">
        <AppsOff apps={state.appsOff} />
      </Row>
      <Stripe onClose={closePurchase} />
    </Page>;
  }
}
