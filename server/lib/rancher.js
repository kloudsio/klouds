// Rancher interface

import compose from '../rancher/compose'
import { deploysDb } from './db'



function create(uid, appName) {
  console.log(`Launching ${appName} for ${uid}`)
  compose[appName].up()
  deploysDb.push({ uid, appName })
}

export default { create }
