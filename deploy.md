# how one might deploy

docker-clean # or remove containers with docker ps -a | grep -Eo "klouds\S*" | while read C; do docker stop $C; docker rm $C; done

./build-all.sh -e server/klouds.env -d
# make sure env APIROOT is correct

  42  curl https://transfer.sh/kM4da/klouds.tar > klouds.tar
   43  docker load klouds.tar
   44  docker load  < klouds.tar
   45  ls
   46  docker images
   47  docker tag 16681f5bdea4 klouds-all
   48  docker images
   49  ls
   50  ls
   51    docker run -d --env-file="$ENV_FILE" -p 80:8080 klouds-all http-server /klouds/www
   52    docker run -d --env-file="$ENV_FILE" --workdir=/klouds/server  --link=redis:redis -p 8080:8080 klouds-all babel-node main.js
   53  export ENV_FILE=klouds.env 
   54    docker run -d --env-file="$ENV_FILE" -p 80:8080 klouds-all http-server /klouds/www
   55    docker run -d --env-file="$ENV_FILE" --workdir=/klouds/server  --link=redis:redis -p 8080:8080 klouds-all babel-node main.js
   56    docker run -d --name=redis redis || docker start redis
   57    docker run -d --env-file="$ENV_FILE" --workdir=/klouds/server  --link=redis:redis -p 8080:8080 klouds-all babel-node main.js
   58  history
thats what i did
on local
  370  scp /code/klouds/server/klouds.env root@ds0nt.com:/root
  320  docker save 16681f5bdea4dd41831240842af817632344809ba99437b50ca6a328edc95d0b > klouds.tar
  335  curl --upload-file ./klouds.tar https://transfer.sh/klouds.tar
