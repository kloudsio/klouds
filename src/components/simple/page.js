import { element } from 'deku'

let Page = {
  name: 'Page',
  render(component, setState) {
    let {state, props} = component
    return <div class="page">
      {props.children}
     </div>
  }
}

export default Page
