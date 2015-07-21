import config from '../config'
import { deploysDb } from './db'
import { up, down, restart } from '../../apps'



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

let apps = {
  create,
  destroy,
  up,
  down,
  restart
}
