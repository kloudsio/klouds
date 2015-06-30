import { element } from 'deku'
let App = {

  render(c) {
    let { state, props } = c

    return <div class="app item">
      <h4>{props.app.name}</h4>
      <p>{props.app.description}</p>
      <button onClick={props.onClick}>Launch</button>
    </div>
  }
}

export default App
