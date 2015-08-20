FROM iojs:latest

RUN npm install babel -g

WORKDIR /app
ADD . /app

CMD ["babel-node", "app.js"]
