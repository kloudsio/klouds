FROM iojs:latest

WORKDIR /klouds

RUN npm install -g babel nodemon

COPY package.json /klouds/
RUN npm install

COPY config.js /klouds/
COPY . /klouds/


EXPOSE 48113

CMD ./scripts/serve
