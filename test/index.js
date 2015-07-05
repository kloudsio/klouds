import { element, tree, render } from 'deku'

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

describe('Elements are Valid', () => {

  lodash.mapValues(elements, el => {
    console.log(el)
    return it('should be a component', () => isComponent(el) )
  })

  lodash.mapValues(elements, el => {
    let container = appendContainer()
    tree(container)
    it('Renders component', () => {

    })
  })

})
