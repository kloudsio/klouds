#!/bin/bash

error() {
	echo -e "\e[00m\e[31m" $@ "\e[00m"
}

out() {
	echo -e "\e[00m\e[32m" $@ "\e[00m"
}


lint() {
	c=$1
	imports="import { element } from 'deku'"
	echo -n "Testing '$c' "
	# Check for: import { element }...
	if [[ $(head -1 $c) != "$imports" ]]; then
		error $c is missing $imports; return
	fi

	# Check for: export default Captalizedword
	if ! $(cat $c | grep -E 'export default [A-Z][a-z]+' ); then
		error "missing required 'export default'"; return
	fi
	out "ok"
}



if [[ $1 ]]; then
	components="$1"
else
	cd $(dirname $0)/../src/components
	components=$(find */*.js | sed -E s/elements\.js//g)
fi


for c in $components; do
	lint $c
done