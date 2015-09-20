#!/bin/bash

# dot-tagged: awesome docker, browserify, build klouds, awesome bash

set -o nounset
set -o errexit




# command || { echo "command failed"; exit 1; }
# if ! command; then echo "command failed"; exit 1; fi
# if ! git remote -v | grep -o "kloudsio/klouds"; then
# fi

envfile='klouds.env'
cloneurl='https://github.com/kloudsio/klouds'

# client build container
docker build -q --tag="bundler" - <<bundler
	FROM node
	WORKDIR /root
	RUN npm install -g babel browserify myth watchify envify
	CMD /bin/bash
bundler

# worker=$(docker create --env-file="$envfile" bundler)

# dockerized task
#
#   -> clone repo 
#	-> build
#   -> envify
#   -> output /bundled.tar
docker run -v `pwd`/bundled:/bundled -i bundler bash <<source
	git clone https://github.com/kloudsio/klouds /klouds

	cd /klouds/client/
	ls /bundled
	cp -rvu /klouds/client/src/public/* /bundled

	./scripts/build-templates

	browserify -v -d src/app.js
	 -t babelify\
	 -t envify\
	 -o /bundled/app.js

	myth src/styles/app.css /bundled/app.css
	cd /bundled
	pwd
	ls -al
source

exit;
# export CLIENT=./dist

# docker rm klouds-build

docker build --tag="klouds-api" - <<Dockerfile
FROM iojs:latest

WORKDIR /code
RUN npm install babel
ADD . /code

EXPOSE 80
EXPOSE 8080

RUN cd /code/server && npm install
CMD ./main.js
Dockerfile

docker run -d --name=klouds-api -p 8080:8080 -p 80:80
