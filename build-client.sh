#!/bin/bash

# dot-tagged: awesome docker, browserify, build klouds, awesome bash

set -o nounset
set -o errexit


envfile='klouds.env'
cloneurl='https://github.com/kloudsio/klouds'

# client build container
docker build -q --tag="bundler" - <<bundler
	FROM node:latest
	WORKDIR /root
	RUN npm install -g babel browserify myth watchify envify
	CMD /bin/bash
bundler


# dockerized task
#
#   -> clone from github
#	-> build
#
docker run -v `pwd`/bundled:/y --env-file="$envfile" -i bundler bash <<source
	set -o nounset
	set -o errexit
   
	git clone https://github.com/kloudsio/klouds /x

	cd /x/client/
	npm install

	cp -rvu /x/client/src/public/* /y
	./scripts/deku-wrap.sh
	browserify -v -d src/app.js \
	 -t babelify\
	 -t envify\
	 -o /y/app.js
	myth src/styles/app.css /y/app.css
source

echo -n `pwd`/y bundled.
ls bundled



# the docker
#
# 	80	 publish /y
# 	8080 api
#
docker build -t api - <<Dockerfile
FROM node:latest

EXPOSE 80
EXPOSE 8080
VOLUME /bundled
CMD babel-node main.js

RUN npm install -g babel koa koa-static unruly
RUN git clone https://github.com/kloudsio/klouds
RUN cd /klouds/server && npm install

Dockerfile

docker run -d --env-file="$envfile" --name=klouds -p 80:80 -p 8080:8080 -v `pwd`/bundled:/bundled api
