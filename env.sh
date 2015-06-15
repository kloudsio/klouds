#!/bin/bash

TERM=xfce4-terminal


export STRIPE_PK='pk_test_yUmttmGoJunk3wEloYLdrO2V'

if [ "$1" = "open" ]; then
	TIMEOUT="bash -c './env.sh build\
	 			&& echo Done Build\
	 			&& timeout -k 3s 3s read\
	 			&& exit 0;\
	 			bash -c read ' "
	$TERM --geometry 58x25+1960+0 -T "Build Client" --command "$TIMEOUT"
	exit 0;
fi;

make "$@"