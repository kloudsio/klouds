#!/bin/bash

for x in $@; do
	html=`cat $x`
  echo html | grep '\<([A-Z]\S*).*\>'
	target="$(dirname $x)/$(basename -s .html $x).js"
	(echo "import { element } from 'deku'"; echo 'export default {'; echo -e "  render: ({props}) => $html"; echo '}')> $target
done
