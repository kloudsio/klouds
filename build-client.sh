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

	# copy index.html etc.
	cp -rvu /x/client/src/public/* /y

	# transpile src to -> app.js, app.css
	./scripts/deku-wrap.sh
	browserify -v -d src/app.js \
	 -t babelify\
	 -t envify\
	 -o /y/app.js
	myth src/styles/app.css /y/app.css
source

# the docker
#
# 	80	 publish /y
# 	8080 api
#
docker build -t api --no-cache - <<server
FROM node:latest

EXPOSE 80
EXPOSE 8080
VOLUME /bundled
WORKDIR /root

RUN npm install -g babel

RUN git clone https://github.com/kloudsio/klouds klouds
RUN npm install koa koa-static unruly debug
RUN cd klouds/server && npm install

CMD babel-node klouds/main.js
server

docker run -d --name=redis redis || docker start redis

docker run -it --env-file="$envfile" \
  --link=redis:redis \
	-v `pwd`/bundled:/bundled \
	-p 8000:80 -p 8080:8080 api
