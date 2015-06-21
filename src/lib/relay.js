// import compose from './composition'

class Relay {
  constructor() {
    this._stack = [];
    this.go = function() {};
  }
  use(x) {
    this._stack.push(x)
    this.go = compose(this.stack).call
  }
  static create() {
    return new Relay();
  }
}

export default Relay

