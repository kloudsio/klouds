let App = {

  render(component) {
    let { state, props } = component

    return <div class="app item">
      <h4>{props.name}</h4>
      <p>{props.description}</p>
      <button disabled={props.disabled} onClick={props.onClick}>Launch</button>
    </div>
  }
}

export default App
