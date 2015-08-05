import { element, tree, render, renderString } from 'deku'

import Apps from '../src/components/apps'
import Login from '../src/components/login'
import Register from '../src/components/register'
import Stripe from '../src/components/stripe'
import Form from '../src/components/form'
import Dashboard from '../src/components/dashboard'
import Debug from '../src/components/debug'

// import Codemirror from '../src/components/code-mirror'`
// import Filter from '../src/components/filter'
// import Github from '../src/components/github'
// import Gridcol from '../src/components/grid-col'
// import Gridrow from '../src/components/grid-row'
// import Logotext from '../src/components/logo-text'
// import Numtext from '../src/components/num-text'
// import Switch from '../src/components/switch'
// import Terminal from '../src/components/terminal'`
let elements = { Apps, Dashboard, Debug, Form, Login, Register, Stripe }


import is from 'is_js'
import lodash from 'lodash'



function appendContainer(){
  let boxer = document.createElement('div')
  document.body.appendChild(boxer)
  return boxer
}

function isComponent(el) {
  let { component, type } = el
  return is.existy(component) && type === 'component'
}

lodash.forEach(elements, (El, name) => {
  describe(name, () => {

    it('exports a deku component', () => isComponent(El) )


    it('renders string, renders html', () => {
      let app = tree(<El />)
      renderString(app)
      let container = appendContainer()
      render(app, container)
    })
  })
})
