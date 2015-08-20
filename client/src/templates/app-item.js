import { element } from 'deku'
export default {
  render: ({props}) => <div class="card">
  <h4 class="title">{props.app.name}</h4>
  <h6 class="url">
    <a href={'https://github.com/' + props.app.repo}>{props.app.repo}</a>
  </h6>
  <ul class="stats">
  </ul>
  <div class="description">{props.app.description}</div>
  <div class="app-demo">
    <a href={props.app.demo}>Demo Page</a>
  </div>
</div>
}
