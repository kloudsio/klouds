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

	# import { element } from 'deku' ?

	if [[ $(head -1 $c) != "$imports" ]]; then
		error $c is missing $imports; return
	fi

	# export default Foobar ?

	if ! $(cat $c | grep -E 'export default [A-Z][a-z]+' ); then
		error "missing required 'export default'"; return
	fi

	out "ok"
}

for c in $@; do
	lint $c
done