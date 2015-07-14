import { element } from 'deku'
export default {
  render: ({props}) => <Row>
	<Col xs="2 middle">
	  <span class="num">{props.n}</span>
	</Col>
	<Col xs="10 middle">
	  <h2>{props.text}</h2>
	</Col>
</Row>
}
