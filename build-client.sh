#!/bin/bash

# client bundle script
src=/tmp/klouds



export APIROOT=http://klouds.io:8080


# clone to tmp
git clone https://github.com/kloudsio/klouds /tmp/klouds
cd /tmp/klouds

# bundle container
docker build --tag="klouds-build" - <<scaffold
	FROM node
	WORKDIR /src
	VOLUME /src
	RUN npm install -g babel browserify myth
	CMD bash
scaffold


# the dirty work
# --env-file=".env"
docker run -i --name=klouds-build \
  -e APIROOT=$APIROOT \
  -v /tmp/klouds:/src \
  klouds-build        \
  /bin/bash <<dobuild
	echo "Starting Build"
	cd client
	env
	./scripts/build
dobuild

docker cp klouds-build:/src/client/dist ./