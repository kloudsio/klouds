#!/bin/babel-node
import { apps, disabled } from '../lib/db'
import appslist from '../apps.json'

for (let app of appslist) {
  apps.push(app)
}
