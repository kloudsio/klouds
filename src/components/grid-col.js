import { element } from 'deku'
import _ from 'lodash'

let Col = {
  defaultProps: {
    xs: [],
    sm: [],
    md: [],
    lg: []
  },

  render (c) {
    let {props, state} = c

    let { xs, sm, md, lg } = props

    let classes = _.map([xs, sm, md, lg],
      // Each Array
      (kk, vv) => _.map(vv,
        // Each String

        (k, v) => {
          console.log(kk, vv)
          switch (true) {
            case v.match(/$[a-zA-Z]*^/):
              return [v, k].join('-')
            case v.match(/^\+[0-9][0-9]?$/):
              return [k, v].join('-')
            case v.match(/^[0-9][0-9]?$/):
              return [k, v].join('-')
            default:
              return [k, v].join('-')
          }
        }
      )
    )
    return <div class={classes}>{props.children}</div>
  }
}

export default Col
