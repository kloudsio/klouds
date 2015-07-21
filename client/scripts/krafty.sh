#!/bin/bash

function css {
	echo -e "/* Automatically Generated Vars */\n\n:root {";

	grep -x '^\s*--.*:.*' *.css | while read x ; do echo -e "\t$x" ; done

	echo "}"
}


FNAME=$0
CMD=$1
shift;
if [ "$CMD" = "classes" ]; then

	ls -1 $@ | while read x; do
		OUTPUT=$(echo $x | sed s/\.js/\.css/g)
		grep -oPw 'class=[{"]\K[^\s}"]+' $x | sed "s/.*/\\.& {\n\t\n}\n/g" > $OUTPUT
	done
	exit 0;
fi
[ "$CMD" = "css" ]     && css && exit $?


# PRINT HELP
echo "Klouds Utils"
echo -e "\nUsage:"
echo -e "\t./$(basename $0) COMMAND [args]"
echo -e "\nCommands:"
echo -e "\t classes <.js file>: Generate CSS file from elements/foo.js"
echo -e "\t css: print out css customizable vars from styles/*.css"
echo -e "\nExamples:"
echo -e "\t./$(basename $0) classes > rawr.css"
echo -e "\t./$(basename $0) css > rawr.css"