import { element } from 'deku'

let Form = {
  initialState() {
    return {
      getData: () => {},
      errors: ''
    }
  },
  render(c) {
    let { props, state } = c

    return <form class="login" onSubmit={submit}>
        <span class="error">{state.errors}</span>
        {props.children}
      </form>
  }
}

let submit = function(ev, c, update) {
  ev.preventDefault()

  let res = new Map()
  let children = ev.target.querySelectorAll('input')

  for (let child of children) {
    res.set(child.name || child.id || child.type, child.value)
  }

  c.props.onSubmit(res)
  return false
}

export default Form
