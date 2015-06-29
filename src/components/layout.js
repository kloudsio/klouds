import { Page, LogoText, Row, Switch, Login, App, Dummy, Stripe, Switch } from '.'
import api from '../api'



let Landing = {
  initialState() {
    return {
      stage: 1,
      noob: true,
      appsOn: [],
      appsOff: [],

    }
  },
  async afterMount(c, el, setState) {
    try {
      let appsOn = await api.apps()
      let appsOff = await api.disabledApps()
      return {
        appsOn: appsOn.data,
        appsOff: appsOff.data
      }
    } catch (error) {
      return { error }
    }
  },

  render(component, setState) {
    let { props, state } = component

    function toggleLogin() {
      setState({ noob: !state.noob })
    }

    function onApp(e, { props, state }, childState) {
      setState({
        app: props,
        stage: state.stage + 1
       })
    }

    return <Page>
      <LogoText>Klouds.io</LogoText>
      <Row n='1' text='Join The Beta' complete={state.user}>

        <Switch index={noob ? 0 : 1}>
          <div>
            <h3>Register or <small>Login</small></h3>
            <Register complete={onLogin} />
          </div>
          <div>
            <h3><small>Register</small> or Login</h3>
            <Login complete={onLogin} />
          </div>
        </Switch>
      </Row>

      <Row n='2' text='We Host Apps'>
        <div>
          {state.appsOn.map(app => <App onClick={onApp} {...app}/>)}
        </div>
          {state.appsOff.map(app => <Dummy {...app} />)}
      </Row>

      <Stripe onClose={closePurchase} />
    </Page>
  }
}


export default Landing