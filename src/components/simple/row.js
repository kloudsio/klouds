import { element } from 'deku'

let Row = {
  render(component) {
    let {state, props} = component
    return <div class="row middle-xs">
      <div class="col-xs-2 center-xs">
        <span class="num">{props.n}</span>
      </div>
      <div class="col-xs-10 middle-xs">
        <h2>{props.text}</h2>
      </div>
      <div class="col-xs-offset-2 col-xs-10 middle-xs">
        {props.children}
      </div>
    </div>
  }
}

export default Row
