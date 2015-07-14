FROM iojs:latest

#
# Klouds IO Directory
#

RUN mkdir -p /k-io/server


#
# copy package.json & npm install
#

ADD ./package.json /k-io/package.json
RUN cd /k-io && npm install -q

ADD ./server/package.json /k-io/server/package.json
RUN cd /k-io/server/ && npm install -q

#
# copy all
#

ADD . ./k-io
RUN cd /k-io/ && make

#
# Container Settings
#

EXPOSE 8080
WORKDIR /k-io
CMD bash start.sh

