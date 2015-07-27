FROM iojs:latest

### Install Babel
RUN npm install -g babel

### Create Klouds Folder
RUN mkdir -p /klouds

### Install NPM Packages
ADD ./server/package.json /klouds/package.json
RUN npm install -q


### Copy Source
ADD ./server/ /klouds/

### Start
WORKDIR /klouds
CMD babel-node serve.js
EXPOSE 8080
