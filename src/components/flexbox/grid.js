import { element } from 'deku'

let Row = {
  render (c) {
    let {props, state} = c
    let { xs, sm, md, lg } = props

    let allNames = ['top', 'middle', 'bottom', 'around', 'between', 'first', 'last']
    function parse(sz) {
      return allNames.filter(v => props[sz].includes(v))
    }

    let classes = [
      {... parse('xs')},
      {... parse('sm')},
      {... parse('md')},
      {... parse('lg')}
    ]
    return <div class={classes}>{props.children}</div>
  }
}

let Col = {
  render (c) {
    let {props, state} = c
    let { xs, sm, md, lg } = props

    function parse(sz) {
      let [_, col, offset, pos] = props[sz].match(/^([0-9]+)?\+([0-9]+)?.*(start|center|end)?/)
      return [
        `col-${props[sz]}-${col}`
        `offset-col-${props[sz]}-${col}`
        `${pos}`
      ]
    }

    let classes = [
      {... parse(xs)},
      {... parse(sm)},
      {... parse(md)},
      {... parse(lg)}
    ]

    return <div class={classes}>{props.children}</div>
  }
}
export default {
  Row,
  Col
}
