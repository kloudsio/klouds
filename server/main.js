#!/bin/babel-node

import unruly from 'unruly'
import api from './lib/app'

api.listen(unruly.api_port,
	() => console.log(`api server started ${unruly.api_port}`
))
