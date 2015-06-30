import { element } from 'deku'

let Switch = {
  render(c, setState) {
    let { props, state } = c
    let filter = props.filter(c)
    let on = props.children.filter(filter)

    return <span>{on}</span>
  }
}

export default Switch
