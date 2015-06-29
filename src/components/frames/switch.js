
let Switch = {
  render(component, setState) {
    let { props, state } = component
    let wrapped = []

    for (var i = 0; i < props.children.length; i++) {
      let style = (i != state.index) ? { display: 'none' } : {}
      wrapped.push(<span key={i} style={style}>{props.children[i]}</span>);
    }

    return <span>{wrapped}</span>
  }
}