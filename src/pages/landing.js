import { element } from 'deku'

import { Page, Row } from '../include/page'
import LogoText from '../elements/logo-text'
import Login from '../elements/login'
import Apps from '../elements/apps'
import AppsOff from '../elements/apps-off'
import Stripe from '../elements/stripe'

import Api from '../lib/api'

async function onLogin (data, setState) {
  setState({error: ''})
  try {
    let response = await Api.login({
      email: data.email,
      password: data.password
    })
    Api.setAuthToken(response.data.token);
    setState({ done: true })
  } catch (response) {
      console.log(response);
    if (response instanceof Error || response.status == 0) {
      // Network Error
      setState({error: 'Could not reach Klouds.io!'})
    } else {
      // non 2xx response
      setState({error: response.data.error})
    }
  }
}

function onRegister (data, setState) {
  let {email, password} = data;
  if (data.password !== data.password2) {
    return setState({
      message: "Passwords do not match."
    });
  }

  let res = Api.register({email, password});
}



export let Landing = {
  name: 'Landing',

  afterMount: async function (c, el) {
    try {
      return await {
        appsOn: (await Api.apps()).data,
        appsOff: (await Api.disabledApps()).data
      }
    } catch (error) {
      console.log(error.message);
      return { error: error }
    }
  },

  render(c) {
    let { props, state, setState } = c;

    function openPurchase(item) {
      setState({ item: item });
    }

    function closePurchase() {
      setState({ item: null });
    }

    return <Page>
      <LogoText>Klouds.io</LogoText>
      <Row n="1" text="Klouds ID" complete={state.user} >
        <Login onLogin={onLogin} />
        <Login type="register" onRegister={onRegister} />
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
