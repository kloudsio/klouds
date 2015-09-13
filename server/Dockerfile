FROM iojs:latest


RUN npm install -g babel nodemon

WORKDIR /klouds
COPY package.json ./
RUN npm install

COPY config.js ./
COPY . /klouds

EXPOSE 8080
ENV NODE_ENV production
CMD babel-node main.js
