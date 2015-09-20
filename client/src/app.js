import Layout from './layout'
import { tree, render, element } from 'deku'

let app = tree()

app.mount(<Layout />)

render(app, document.querySelector('main'))
