let all = {}

import Form from './frames/form'
import Switch from './frames/switch'
all.Form = Form
all.Switch = Switch

import Page from './simple/page'
import LogoText from './simple/logo-text'
import Row from './simple/row'
import App from './simple/app'
import Dummy from './simple/apps-off'
all.LogoText = LogoText
all.Page = Page
all.Row = Row
all.App = App
all.Dummy = Dummy

import Login from './logical/login'
import Stripe from './logical/stripe'
all.Login = Login
all.Stripe = Stripe

export default all
