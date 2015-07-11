import { element } from 'deku'

let Switch = create({
  filter: c => {
    let {props, state} = c
    return props.children.filter((v, k) => k === props.page)
  }
})

export default Switch