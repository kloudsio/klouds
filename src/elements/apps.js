import { element } from 'deku';
let _ = require('lodash');


let App = {
	render(c) {
		let { props } = c;
		let { name, description } = props.app;
		console.log(props.app)
		return <div class="app item">
			<h4>{name}</h4>
			<p>{description}</p>
			<button disabled={!props.launchable} onClick={props.onOpen}>Launch</button>
		</div>
	}
}

let Apps = {

	propTypes: {
		user: {
			source: 'user'
		},
		apps: {}
	},

	render(c) {
		let { state, props } = c;

		let apps = _.map(
			props.apps,
			app => <App app={app} launchable={props.user} onOpen={ props.onPurchase} />
		);

		return <div>{apps}</div>
	}
}

export default Apps;
