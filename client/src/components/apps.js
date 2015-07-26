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
    let apps = await api.apps()
    console.log(apps)
    return { apps: apps.data }
  },
  render(c) {
    let { props, state } = c
    let { apps } = state


    let items = apps.map(v =>
      <div onClick={() => props.onLaunch(v)} >
        <App app={v} />
      </div>
    )

    return <div>{items}</div>
  }
}

export default Apps
