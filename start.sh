#!/bin/bash

# server listen port
export PORT=8080

# mongo db conection string
export MONGODB='klouds-db/klouds'

# bundled front-end
export ASSETS='../dist'

# input nonsense
export JWT_KEY='burn the wit5hes!'

# stripe key
export STRIPE_SK='sk_test_huzzah?'

cd server
./node_modules/.bin/babel-node index.js
