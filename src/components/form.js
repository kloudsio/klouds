import { element } from 'deku'

function submitData(el) {
  let res = {}
  let children = el.querySelectorAll('input')

  for (let child of children) {
    res[child.name || child.id || child.type] = child.value
  }

  return res
}

async function submit(ev, c, update) {
  let res = null
  let error = false

  ev.preventDefault()

  try {
    res = c.props.onSubmit(submitData(ev.target))
  } catch (e) {
    return update({ error: typeof e.error || 'Failed to reach server'  })
  }

  update(res)
}

let Form = {
  initialState() {
    return {
      error: ''
    }
  },
  render(c) {
    let { props, state } = c

    return <form onSubmit={submit} {... props}>
        <span class="error">{state.error}</span>
        {props.children}
      </form>
  }
}

export default Form
