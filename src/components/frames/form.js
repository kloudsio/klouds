import is from 'is_js'

let Form = {

  initialState(props) {
    return {
      getData: () => {},
      errors: '',
    }
  },
  render(c, setState) {
    let { props, state } = c;

    function on(x) {
      return () => setState(props.on(x, state.getData()))
    }

    return <form class="login">
        <span class="error">{state.errors}</span>
        {props.children}
      </form>
  },

  afterMount(c, el) {
    return {
      getData: () => {
        let res = {};
        for (let element of el.querySelector('[name="*"]'))
          res[element.name] = element;
        return res;
      }
    }
  }

}