import { element } from 'deku';

import LogoText from './logo-text'
import Login from './login'
import Apps from './apps'
import AppsOff from './apps-off'
import Stripe from './stripe'

/*
	App Events
*/


let Row = {
	name: 'Row',
	render: c => <div class="row middle-xs">
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
}

let Page = {
	name: 'Page',
	render: c => <div class="page">{c.props.children}</div>
}

export let Landing = {
	name: 'Landing',

	propTypes: {
	  	api: {
	    	source: 'api'
	 	},
	},

	afterMount: async function (c, el) {
		let { props } = c;
		// Sets state of apps, appsOff
		return props.api.apps();
	},

 	render(c) {
 		let { props, state, setState } = c;

 		function openPurchase(item) {
		  setState({ item: item });
		}

		function closePurchase() {
		  setState({ item: null });
		}

 		return <Page>
	    	<LogoText>Klouds.io</LogoText>
	    	<Row n="1" text="Klouds ID" complete={state.user} >
		    	<Login />
	    	</Row>
	    	<Row n="2" text="Klouds ID">
	    		<Apps apps={state.apps} onPurchase={openPurchase}/>
	    	</Row>
	    	<Row n="3" text="Klouds ID">
	    		<AppsOff apps={state.appsOff} />
	    	</Row>
	    		<Stripe onClose={closePurchase} />
		</Page>
	}
}