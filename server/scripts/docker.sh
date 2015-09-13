#!/bin/bash

# main screen turn on 
docker run -d --restart=always  --name=redis -v /var/redis:/data 'redis'

# take off every zig
tag=klouds-api
docker kill $tag
docker rm $tag
docker build -t $tag ./server
docker run -d --restart=always  --name=$tag -p 48113:48113 $tag
