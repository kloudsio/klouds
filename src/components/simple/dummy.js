import { element } from 'deku'

let Dummy = {
	name: 'Dummy',
  render(c) {
    let { state, props } = c

    return <div class="app-off">
      {props.name}
    </div>
  }
}


export default Dummy