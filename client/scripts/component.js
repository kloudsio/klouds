import optimist from 'optimist'

let parts = {}

parts.initialState = x => `initialState(props) {
  ${x}
}`
parts.defaultProps = x => `defaultProps: {
  ${x}
}`
parts.beforeMount = x => `beforeMount({props, state, id}) {
  ${x}
}`
parts.shouldUpdate = x => `shouldUpdate({props, state, id}, nextProps, nextState) {
  ${x}
}`
parts.beforeRender = x => `beforeRender({props, state, id}) {
  ${x}
}`
parts.beforeUpdate = x => `beforeUpdate({props, state, id}, nextProps, nextState) {
  ${x}
}`
parts.afterRender = x => `afterRender({props, state, id}, el) {
  ${x}
}`
parts.afterUpdate = x => `afterUpdate({props, state, id}, prevProps, prevState, setState) {
  ${x}
}`
parts.afterMount = x => `afterMount({props, state, id}, el, setState) {
  ${x}
}`
parts.beforeUnmount = x => `beforeUnmount({props, state, id}, el) {
  ${x}
}`

var argv = optimist.usage('Generate Deku Components', {
  all: {
    description: 'Generate Complete Component',
    short: 'a'
  },
  s: {
    description: parts.initialState('// code'),
    short: 's'
  },
  p: {
    description: parts.defaultProps('// code'),
    short: 'p'
  },
  m: {
    description: parts.beforeMount('// code'),
    short: 'm'
  },
  sh: {
    description: parts.shouldUpdate('// code'),
    short: '-'
  },
  r: {
    description: parts.beforeRender('// code'),
    short: 'r'
  },
  u: {
    description: parts.beforeUpdate('// code'),
    short: 'u'
  },
  R: {
    description: parts.afterRender('// code'),
    short: 'R'
  },
  U: {
    description: parts.afterUpdate('// code'),
    short: 'U'
  },
  M: {
    description: parts.afterMount('// code'),
    short: 'M'
  },
  q: {
    description: parts.beforeUnmount('// code'),
    short: 'q'
  },

}).argv

optimist.showHelp()


let name = argv._[0]
let contents = []
if (argv.s) { contents.push(parts.initialState(argv.s)) }
if (argv.p) { contents.push(parts.defaultProps(argv.p)) }
if (argv.m) { contents.push(parts.beforeMount(argv.m)) }
if (argv.sh) { contents.push(parts.shouldUpdate(argv.sh)) }
if (argv.r) { contents.push(parts.beforeRender(argv.r)) }
if (argv.u) { contents.push(parts.beforeUpdate(argv.u)) }
if (argv.R) { contents.push(parts.afterRender(argv.R)) }
if (argv.U) { contents.push(parts.afterUpdate(argv.U)) }
if (argv.M) { contents.push(parts.afterMount(argv.M)) }
if (argv.q) { contents.push(parts.beforeUnmount(argv.q)) }

let result = `import { element } from 'deku'

let ${ name } = {
  name: '${ name }',

  render({props, state, id}, setState) {
    return <div></div>
  },

  ${ contents.join('\n\t') }

}

export default ${name}
`)

import write