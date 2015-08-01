import validator from 'validator'

export default {
  '/(login|register)': {
    request: {
      method: 'POST',
      body: {
        email: validator.isEmail,
        password: /.{6,100}/
      },
      type: 'json'
    }
  },
  '/subscribe': {
    request: {
      method: 'POST',
      body: {
        app: str => validator.toString(str).length > 3,
        source: str => validator.toString(str).length > 3
      },
      type: 'json'
    }
  }
}
