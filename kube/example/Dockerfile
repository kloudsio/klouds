FROM iojs:latest

RUN npm install babel -g

WORKDIR /app
ADD . /app

EXPOSE 8080
CMD ["babel-node", "app.js"]
