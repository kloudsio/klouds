
# the docker
#
# 	80	 publish /y
# 	8080 api
#
docker build -t api --no-cache - <<server
FROM node:latest

EXPOSE 80
EXPOSE 8080

VOLUME /www
WORKDIR /root

RUN npm install -g babel

RUN git clone https://github.com/kloudsio/klouds klouds
RUN npm install koa koa-static unruly debug
RUN cd klouds/server && npm install

CMD babel-node klouds/main.js
server

docker run -d --name=redis redis || docker start redis

docker run -it --env-file="$envfile" \
  --link=redis:redis \
	-v `pwd`/www:/www \
	-p 8000:80 -p 8080:8080 api
