import { element, scene, render } from 'deku'
import assert from 'assert'
import config from '../src/config'
import is from 'is_js'

import All from '../src/components/elements'
let { Page, Row, Switch, LogoText, Login, Register, App, Dummy } = All

let app = scene(<div />)
app.set(config)

//
let isDeku = function(v) {
  let { component, type } = v
  return is.existy(component) && type === 'component'
}

let box = function(unboxed) {
  let boxer = document.createElement('div')
  document.body.appendChild(boxer)
  let boxee = scene(unboxed)
  render(boxee, boxer)
  return boxee
}


describe('Elements are Valid', () => {

  app.mount(<div></div>)

  it('exports "Page" component', () => {
    let el = <Page />
    assert.ok(isDeku(el), 'valid deku component')
    app.mount(el)
    box(el)
  })
  it('exports "LogoText" component', () => {
    let el = <LogoText />
    assert.ok(isDeku(el), 'valid deku component')
    app.mount(el)
    box(el)
  })
  it('exports "Row" component', () => {
    let el = <Row />
    assert.ok(isDeku(el), 'valid deku component')
    app.mount(el)
    box(el)
  })
  it('exports "Switch" component', () => {
    let el = <Switch />
    assert.ok(isDeku(el), 'valid deku component')
    app.mount(el)
    box(el)
  })
  it('exports "Login" component', () => {
    let el = <Login />
    assert.ok(isDeku(el), 'valid deku component')
    app.mount(el)
    box(el)
  })
  it('exports "Register" component', () => {
    let el = <Register />
    assert.ok(isDeku(el), 'valid deku component')
    app.mount(el)
    box(el)
  })
  it('exports "App" component', () => {
    let el = <App />
    assert.ok(isDeku(el), 'valid deku component')
    app.mount(el)
    box(el)
  })
  it('exports "Dummy" component', () => {
    let el = <Dummy />
    assert.ok(isDeku(el), 'valid deku component')
    app.mount(el)
    box(el)
  })

})
