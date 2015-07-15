import { element } from 'deku'

let Debug = {
  render: c => {
    if (process.env.NODE_ENV === 'development') {
      return <div style={{background: 'rgba(100, 0, 0, 0.3)'}}>{c.props.children}</div>
    }
    return null
  }
}

export default Debug
