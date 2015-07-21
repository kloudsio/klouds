import { element } from 'deku'

let Debug = {
  initialState(props) {
    return {
      hidden: process.env.NODE_ENV !== 'development'
    }
  },
  render: component => {
    let { props, state } = component

    function toggle(ev, c, setState) {
      setState({ hidden: !state.hidden })
    }

    return state.hidden ? <div></div>
      : <div class="debug" onDoubleClick={toggle}>{component.props.children}</div>
  }
}

export default Debug
