import { element } from 'deku'
import { extend } from 'lodash'

import Filter from './filter'

let Switch = extend(Filter, {
  defaultProps: {
    i: 0,
    filter: c => {
      let { props } = c
    	console.log('filtered', props)
      return props.children.filter((v, k) => k === props.i)
    }
  }
})

export default Switch
