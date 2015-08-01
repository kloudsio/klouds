import db from '../lib/db'
// Rancher interface

import compose from '../lib/rancher-compose'

function create(uid, appName) {
  console.log(`Launching ${appName} for ${uid}`)
  compose[appName].up()
  db.deploys.push({ uid, appName })
}

export default { create }
