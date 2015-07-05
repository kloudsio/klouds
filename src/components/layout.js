import { element } from 'deku'
import api from '../api'
import lodash from 'lodash'
import elements from './elements'

let { Switch, Page, LogoText, Col, Row, Numbered } = elements



let Layout = {

  initialState() {
    return {
      page: 1
    }
  },

  render(c, update) {
    let { props, state } = c
    let setpage = x => update({page: x})



    return (
      <Page>
        <LogoText>Klouds.io</LogoText>
        <Row>
          <Paged>
            <Col xs="4+4" setpage={setpage}>

            </Col>
            <Col xs="4+4" setpage={setpage}>

            </Col>
            <Col xs="4+4" setpage={setpage}>

            </Col>
          </Paged>
        </Row>
      </Page>
    )
  }
}

export default Layout
