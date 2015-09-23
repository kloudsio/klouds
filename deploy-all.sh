


docker build -t klouds-all - <<KEOF
FROM node

RUN npm install -g babel http-server
EXPOSE 8080
WORKDIR /klouds

CMD bash
KEOF

docker run -d --name=redis redis || docker start redis
docker run -d -p 9000:${WWW_PORT} klouds-all http-server www -p ${WWW_PORT}
docker run -d -p 8000:${API_PORT} klouds-all babel-node server/main.js


docker run -d --env-file="$envfile" \
	-p 8080 klouds-all \
  http-server /klouds/www -p 8080

docker run -d --env-file="$envfile" \
  --link=redis:redis -p 8080 klouds-all \
  babel-node klouds/main.js
