import { element } from 'deku'

let Col = {
  render (c) {
    let {props, state} = c
    let { xs='', sm='', md='', lg='' } = props

    function parse(tag, size) {
      let [_, col, offset, pos] = size.match(/^([0-9]+)?\+([0-9]+)?.*(start|center|end)?/)
      return [
        `col-${tag}-${col}`,
        `offset-col-${tag}-${col}`,
        `${pos}`
      ]
    }

    let classes = [
      {... parse('xs', xs)},
      {... parse('sm', sm)},
      {... parse('md', md)},
      {... parse('lg', lg)}
    ]

    return <div class={classes}>{props.children}</div>
  }
}
export default Col
