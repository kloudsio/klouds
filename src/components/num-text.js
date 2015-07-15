import { element } from 'deku'
import Row from './grid-row'
import Col from './grid-col'

let NumText = {
  render: ({props}) => <Row>
    <Col xs="2 middle">
      <span class="num">{props.left}</span>
    </Col>
    <Col xs="10 middle">
      <h2>{props.children}</h2>
    </Col>
  </Row>
}


export default NumText