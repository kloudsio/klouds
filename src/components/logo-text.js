import { element } from 'deku'
import Shifty from 'shifty'

export default {
  render(c) {
    let { props, state } = c

    return <div class="row center-xs">
      <div class="col-xs-12 middle-xs">
        <svg class="logo">
          <text>{props.children}</text>
        </svg>
      </div>
    </div>
  },


  afterMount(c, el) {
    let shiftEl = el.querySelector('text')

    new Shifty().tween({
      from: { offset: 0 },
      to: { offset: -1200 },
      duration: 1500,
      easing: 'easeInQuad',
      step: (lerp) => {
        shiftEl.style.strokeDashoffset = lerp.offset
      }
    })
  }
}
