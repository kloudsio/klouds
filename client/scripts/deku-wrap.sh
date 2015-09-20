#!/bin/bash

cd `dirname $0`/..
all=src/templates/*.html

for template in $all; do
	target="$(dirname $template)/$(basename -s .html $template).js"
	[ "$template" -nt "$target" ] || continue
	html=`cat $template`
  echo html | grep '\<([A-Z]\S*).*\>'
	(
    echo "import { element } from 'deku'";
    echo 'export default {';
    echo -e "  render: ({props}) => $html"; echo '}'
  )> $target
	echo "$template -> $target"
done
