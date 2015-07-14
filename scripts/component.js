import { prompt } from 'inquirer'

let beforeMount = x => `beforeMount({props, state, id}) {${x}}`
let shouldUpdate = x => `shouldUpdate({props, state, id}, nextProps, nextState) {${x}}`
let beforeRender = x => `beforeRender({props, state, id}) {${x}}`
let beforeUpdate = x => `beforeUpdate({props, state, id}, nextProps, nextState) {${x}}`
let afterRender = x => `afterRender({props, state, id}, el) {${x}}`
let afterUpdate = x => `afterUpdate({props, state, id}, prevProps, prevState, setState) {${x}}`
let afterMount = x => `afterMount({props, state, id}, el, setState) {${x}}`
let beforeUnmount = x => `beforeUnmount({props, state, id}, el) {${x}}`


let initialState = x => `initialState(props) {${x}}`
let defaultProps = x => `defaultProps: {${x}}`

let thener = fn => (... x) => new Promise(resolve => fn(... x, resolve))
let ask = thener(prompt)

ask({
  type: 'input',
  name: 'appendState',
  message: 'initialState(props) returns {?}',
  default: 'Nope, all good!'
})


function template(options) {
  let {
    name,
    initialState,
    defaultProps,
    beforeMount,
    shouldUpdate,
    beforeRender,
    beforeUpdate,
    afterRender,
    afterUpdate,
    afterMount,
    beforeUnmount
  } = options

  return `import { element } from 'deku'
let ${name} = {
  name: '${name}',

  ${initialState}
  ${defaultProps}

  ${beforeMount}
  ${shouldUpdate}
  ${beforeRender}
  ${beforeUpdate}

  render({props, state, id}, setState) {
    return <div></div>
  },

  ${afterRender}
  ${afterUpdate}
  ${afterMount}
  ${beforeUnmount}
}
export default ${name}
`
}

