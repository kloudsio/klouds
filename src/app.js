import config from './config'
import Layout from './components/layout'
import { tree, render, element } from 'deku'


let app = tree()
app.set(config)

app.mount(<Layout />)

render(app, document.querySelector('main'))
