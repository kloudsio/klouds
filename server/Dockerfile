FROM iojs:latest

COPY . /klouds
WORKDIR /klouds

RUN npm install -g babel nodemon && npm install

EXPOSE 48113
CMD ./scripts/serve
