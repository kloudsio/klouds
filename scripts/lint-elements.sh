#!/bin/bash

IN_DIR=$(dirname $0)/../src/components
cd $IN_DIR

components=$(find */*.js | sed -E s/elements\.js//g)





error() {
	echo -e "\e[00m\e[31m" $@
}

out() {
	echo -e "\e[00m\e[33m" $@
}

imports="import { element } from 'deku'"
exports=""
for c in $components; do

	out $c
	# Check for: import { element }...
	if [[ $(head -1 $c) == "$imports" ]]; then
		error $c is missing $imports
	fi

	# Check for: export default Captalizedword
	if [[ $(cat $c | grep -E 'export default [A-Z][a-z]') != "$exports" ]]; then
		error $c does not export default component
	fi
	out "$c passed all tests"
done