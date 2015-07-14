import { element } from 'deku'
import App from '../templates/app-item'
import api from '../api'

let Apps = {
	initialState (props) {
		return {
			apps: []
		}
	},
  async afterMount() {
    let apps = await api.apps()
    return { apps: apps.data }
  },
  render(c) {
    let { props, state } = c
    let { apps } = state

    let items = apps.map(v => <App app={v} />)

    return <div>{items}</div>
  }
}

export default Apps
