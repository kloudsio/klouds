FROM iojs:latest

WORKDIR /code
RUN npm install -g babel
RUN npm install -g browserify myth

ADD client /code/client
RUN cd /code/client && npm install

ADD server /code/server
RUN cd /code/server && npm install

CMD babel-node container.js
