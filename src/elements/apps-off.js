import { element } from 'deku';

let _ = require('lodash');

function render(c) {
	let { state, props } = c;

	let apps = _.map(props.apps, (app) => <div class="app-off">
		{app.name}
	</div>);

	return <div>{apps}</div>
}


export default { render };
