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

    return <form class="login">
        <span class="error">{state.errors}</span>
        {props.children}
      </form>
  },

  afterMount(c, el) {
    return {
      getData: () => {
        let res = {}
        for (let element of el.querySelector('[name=*]'))
          res[element.name] = element
        return res
      }
    }
  }

}

export default Form
