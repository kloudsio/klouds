import { element } from 'deku'

let Row = {
  render ({props, state}) {
    let { xs='', sm='', md='', lg='' } = props

    let words = xs.match(/\S+/g)
    words = words == null ? [] : words.map(x => `${x}-xs`)
    let classes = ['row', ...words]

    return <div class={classes}>{props.children}</div>
  }
}

export default Row
