#!/bin/bash

# dot-tagged: awesome docker, browserify, build klouds, awesome bash

set -o nounset
set -o errexit


envfile='klouds.env'
cloneurl='https://github.com/kloudsio/klouds'

# client build container
docker build -q --tag="bundler" - <<bundler
	FROM node
	WORKDIR /root
	RUN npm install -g babel browserify myth watchify envify
	CMD /bin/bash
bundler


# dockerized task
#
#   -> clone from github
#	-> build
#
docker run -v `pwd`/bundled:/y -i bundler bash <<source
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
docker build --tag="klouds-api" - <<Dockerfile
FROM iojs:latest
WORKDIR /root

EXPOSE 80
EXPOSE 8080
VOLUME /y
CMD ./klouds/main.js

RUN npm install babel
RUN git clone https://github.com/kloudsio/klouds
RUN cd /root/klouds && npm install

Dockerfile

docker run -d --name=klouds -p 80 -p 8080 -v `pwd`/y:/y
