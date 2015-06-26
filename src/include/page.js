import { element } from 'deku'

export let Page = {
 name: 'Page',
 render: c => <div class="page">{c.props.children}</div>
}

export let Row = {
 name: 'Row',
 render: c => (
  <div class="row middle-xs">
    <div class="col-xs-2 center-xs">
      <span class="num">{c.props.n}</span>
    </div>
    <div class="col-xs-10 middle-xs">
      <h2>{c.props.text}</h2>
    </div>
    <div class="col-xs-offset-2 col-xs-10 middle-xs">
      {c.props.children}
    </div>
  </div>
  )
}
