import { element } from 'deku'
import codebox from 'codemirror'
let Code = {
  render() {
    return <div>
      <textarea style="position: absolute; top 0; left: 0; right: 40%, bottom: 40%" ></textarea>
    </div>
  },
  afterMount({ props, state, id}, elem, update) {
    update({
      codemirror: codebox.fromTextArea(elem.querySelector('textarea'), {
        mode: 'javascript',
        // theme: 'monokai',
        inputStyle: "contenteditable",
        lineNumbers: true,
      })
    })
  }
}

export default Code
