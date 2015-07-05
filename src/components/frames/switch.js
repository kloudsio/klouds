import { element } from 'deku'
import { extend } from 'lodash'



let Filter = {
  render(c) {
    let { props, state } = c
    return <div class="switch">{ props.filter(c) }</div>
  }
}

let create = function(options) {
  return extend(Filter, {
		defaultProps: { filter: options.filter }
	})
}


let Pages = create({
  filter: c => {
    let {props, state} = c
    return props.children.filter((v, k) => k === props.page)
  }
})

export default Pages
