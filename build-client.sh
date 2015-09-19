#!/bin/bash

# client bundle script
output=`pwd`/dist
src=/tmp/klouds
rm -r $output
mkdir $output

export APIROOT=http://klouds.io:8080

# clone to tmp
git clone https://github.com/kloudsio/klouds /tmp/klouds
cd /tmp/klouds

# bundle container
docker build --tag="klouds-build" - <<scaffold
	FROM node
	WORKDIR /src
	VOLUME /output
	VOLUME /src
	RUN npm install -g babel browserify myth
	CMD bash
scaffold


# the dirty work
# --env-file=".env"
docker run --rm -i    \
  -e APIROOT=$APIROOT \
  -v /tmp/klouds:/src \
  -v $output:/output  \
  "klouds-build"      \
  /bin/bash <<bundle
	echo "Starting Build"
	cd client 
	ls -al;
	env
	./scripts/build /output
bundle
