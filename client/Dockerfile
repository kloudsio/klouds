FROM iojs:latest

RUN mkdir /klouds

RUN npm install -g babel http-server

ADD package.json /klouds/package.json
RUN cd /klouds && npm install -q
ADD . /klouds/

RUN /klouds/scripts/build

WORKDIR /klouds
EXPOSE 2020
CMD ./scripts/serve
