import { element } from 'deku'
import shifty from 'shifty'

function render(component) {
  let { props, state } = component

  return <div class="row center-xs">
      <div class="col-xs-12 middle-xs">
        <svg class="logo">
          <text>{props.children}</text>
        </svg>
      </div>
    </div>
}


function outline(el) {
  new shifty().tween({
    from: { offset: 0 },
    to: { offset: -1200 },
    duration: 1500,
    easing: 'easeInQuad',
    step: ({offset}) => {
      el.style.strokeDashoffset = offset
    }
  })
}

function afterRender(component, el) {
  outline(el.querySelector('text'))
}

export default { render, afterRender }
