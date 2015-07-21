import { element } from 'deku'

function submitData(el) {
  let res = {}
  let children = el.querySelectorAll('input')

  for (let child of children) {
    res[child.name || child.id || child.type] = child.value
  }
  console.log(res)
  return res
}

function process(ev, c, update) {
  ev.preventDefault()
  update({ error: '' })

  let res = null
  let error = false

  try {
    c.props.onSubmit(submitData(ev.target), c, update)
  } catch (e) {
    update({ error: typeof e.error ? e.error : 'Failed to reach server'  })
  }

  return false
}

let Form = {
  initialState() {
    return {
      error: ''
    }
  },
  render(c) {
    let { props, state } = c
    let title = props.title

    return <form {... props} onSubmit={process} >
      <h3>{title}</h3>
      <span class="error">{state.error}</span>
      {props.children}
    </form>
  }
}

export default Form
