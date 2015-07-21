import { element } from 'deku'
export default {
  render: ({props}) => <div class="app item" onClick={ props.onClick }>
  <h4>{props.app.name}</h4>
  <p>{props.app.description}</p>
</div>
}
