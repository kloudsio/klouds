import low from 'lowdb'
import { join } from 'path'

export default {
  appsDb: low(join(__dirname, '/apps.json')),
  stripeDb: low(join(__dirname, '/stripe.json')),
}
