#!/bin/bash

HOST=http://localhost:3000


echo 'Apps:'
curl $HOST/apps -s -H "Content-Type: application/json"
iojs -e "console.log($apps.map(function(v){ return v.name } ).join(', '))"
echo

echo 'Disabled Apps:'
curl $HOST/disabled -s -H "Content-Type: application/json"
iojs -e "console.log($disabled.map(function(v){ return v.name } ).join(', '))"
echo

echo 'Register and Login with BS email'
curl -i -H "Content-Type: application/json" -d '{
  "email": "'$(date +%s)'@klouds.io",
  "password": "TEST123"
}' $HOST/register $HOST/login


# echo -n -e "\nPOST /login:    \t--\t"
# curl --silent -i localhost:1999/login \
#   -d email=test@klouds.io \
#   -d password=test \
#   --header "Content-Type:application/json"
#   # | head -1
#
# echo -n -e "\nGET /subscribe: \t--\t"
# curl --silent -i localhost:1999/subscribe\
# | head -1
