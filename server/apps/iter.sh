#!/bin/bash

IFS=$'\n'

for i in $( cat ../apps.json ); do
  firefox "https://github.com/search?utf8=%E2%9C%93&q=\"$i\""
done
