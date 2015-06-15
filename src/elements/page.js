import { element } from 'deku';

import LogoText from './logo-text'
import Login from './login'
import Apps from './apps'
import Stripe from './stripe'

const name = 'Login';

function render(component, setState) {
	return <div class="page">
            <LogoText>Klouds.io</LogoText>
            <Login />
            <Apps />
            <Stripe />
        </div>;
}

export default {
    name,
    render
};