import { element } from 'deku';

import LogoText from './logo-text'
import Login from './login'
import Apps from './apps'
import Stripe from './stripe'

const name = 'Login';


/*
	App Events
*/

let show = function (item) {
  app.set('payment', {
    id: item.id,
    name: item.name,
    description: `Recurring Monthly Subscription to ${item.name}`,
    amount: 999
  });
}

let Row = {
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


let render = (c) => <div class="page">
    <LogoText>Klouds.io</LogoText>
    <Row n="1" text="Klouds ID">
    	<Login />
    </Row>
    <Apps />
    <Stripe />
</div>;

export default {
    name,
    render
};