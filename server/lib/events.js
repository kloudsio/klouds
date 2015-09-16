import db from './db'
import compose from './compose'

let subscribe = (uid, appName) => {
  
  console.log(`Launching ${appName} for ${uid}`)
  
  compose[appName].up()
  
  db.deploys.push({ uid, appName })
}

export default { subscribe }
