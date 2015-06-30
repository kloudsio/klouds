import {element} from 'deku'
import api from '../api'

import All from './elements'
let { Page, LogoText, Row, Switch, Login, Register, App, Dummy } = All

let Layout = {
  initialState() {
    return {
      stage: 1,
      noob: true,
      appsOn: [],
      appsOff: []

    }
  },
  async afterMount(c, el) {
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

    function onLogin(e, c) {
      setState({
        user: c.state.user,
        stage: 2
       })
    }

    let switchFilter = () =>
      (v, k) =>
        (state.noob ? 0 : 1) === k

    function toggle() {
      setState({noob: !state.noob})
    }

    function onApp(e, c) {
      setState({
        app: c.props,
        stage: 3
       })
    }

    return <Page>
      <LogoText>Klouds.io</LogoText>
      <Row n="1" text="Join The Beta">
        <Switch filter={switchFilter}>
          <div>
            <h3>Register or <small onClick={toggle}>Login</small></h3>
            <Register onLogin={onLogin} />
          </div>

          <div>
            <h3><small onClick={toggle}>Register</small> or Login</h3>
            <Login onLogin={onLogin} />
          </div>
        </Switch>
      </Row>

      <Row n="2" text="We Host Apps">
        {state.appsOn.map(app => <App app={app} onClick={onApp} />)}
        {state.appsOff.map(app => <Dummy name={app.name} />)}
      </Row>

    </Page>
  }
}

export default Layout
