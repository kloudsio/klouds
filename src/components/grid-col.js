import { element } from 'deku'
import _ from 'lodash'

let Col = {
  defaultProps: {
    xs: '',
    sm: '',
    md: '',
    lg: ''
  },

  render (c) {
    let {props, state} = c

    let { xs='', sm='', md='', lg='' } = props

    let classes = []
    _.forEach({xs, sm, md, lg}, (v, k) => {
      console.log(k, v)

      let words = v.match(/([a-zA-Z]+)/)
      let cols = v.match(/^([0-9]+)/)
      let offsets = v.match(/\s([0-9]+)/)

      console.log(words, offsets, cols)
      if (words) {
        classes.push([words[0], k].join('-'))
      }
      if (offsets) {
        classes.push(['col', k, 'offset', offsets[0].substr(1)].join('-'))
      }
      if (cols) {
        classes.push(['col', k, cols[0]].join('-'))
      }
    })
    return <div class={classes}>{props.children}</div>
  }
}

export default Col
