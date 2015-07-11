import { element } from 'deku'

/*
	Children from Props Function run in the context of this element

	<Filter filter="c => c." />
*/

let Filter = {
  render(c) {
    let { props, state } = c
    return <div class="switch">{ props.filter(c) }</div>
  }
}

export default Filter
