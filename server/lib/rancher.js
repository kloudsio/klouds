import { up, down, restart } from '../rancher/compose'
import { deploysDb } from './db'

let create = function* (appId, paymentId, options ) {
  let { userid = this.state.user.id } = options

  if (!appId) {
    throw 'missing required argument appId'
  }
  if (!paymentId) {
    throw 'missing required argument paymentId'
  }

  deploysDb.push({ appId, paymentId, userid })
}

let destroy = function* () {

}

export default {
  create,
  destroy,
  up,
  down,
  restart
}
