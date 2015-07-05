import { element } from 'deku'


let Section = {
  render(c) {
    let {state, props} = c

    return [
      <Col xs="2 middle">
        <span class="num">{props.n}</span>
      </Col>,
      <Col xs="10 middle">
        <h2>{props.text}</h2>
      </Col>
    ]
  }
}

export default Section
