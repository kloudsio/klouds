#!/bin/bash

for x in $@; do
	html=`cat $x`
	target="$(dirname $x)/$(basename -s .html $x).js"
	(echo "import { element } from 'deku'"; echo 'export default {'; echo -e "  render: ({props}) => $html"; echo '}')> $target
done
