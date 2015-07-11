import { element } from 'deku'
import api from '../api'
import lodash from 'lodash'
import elements from './elements'

let { Switch, Page, LogoText, Col, Row, Numbered, Login, Register } = elements



let Layout = {

  initialState() {
    return {
      page: 1
    }
  },

  render(c, update) {
    let { props, state } = c
    let setpage = x => update({page: x})

    let formToggle = () => { update({page: page}) }
    let onLogin = () => { update({page: page}) }


    return (
      <Page>
        <LogoText>Klouds.io</LogoText>
        <Row xs="middle">
          <Switch i={state.page}>
            <Col xs="4+4" setpage={setpage}>
              <h3 onClick={formToggle}>Register or<small> Login </small></h3>
              <Register onLogin={onLogin} />
            </Col>

            <Col xs="4+4" setpage={setpage}>
              <h3 onClick={formToggle}><small>Register</small> or Login</h3>
              <Login onLogin={onLogin} />
            </Col>

            <Col xs="4+4" setpage={setpage}>
              Section 3
            </Col>
          </Switch>
        </Row>
      </Page>
    )
  }
}

export default Layout
