import { element, tree, render, renderString } from 'deku'

import assert from 'assert'
import is from 'is_js'
import lodash from 'lodash'


import elements from '../src/components/elements'

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
