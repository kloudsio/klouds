import { element } from 'deku'
import App from '../templates/app-item'
import api from '../api'

let Apps = {
  initialState() {
    return {
      apps: []
    }
  },
  async afterMount() {
    const apps = await api.apps()
    function empty(app) {
      let { name="--", description="--", repo="--", image="#"} = app
      return { name, description, repo, image }
    }

    return { apps: apps.data.map(empty) }
  },
  render(c) {
    let { props, state } = c
    let { apps } = state


    let items = apps.map(v =>
      <div class="col-lg-3" onClick={() => props.onLaunch(v)}>
        <App app={v} />
      </div>
    )

    return <div class="sheet row">{items}</div>
  }
}

export default Apps
