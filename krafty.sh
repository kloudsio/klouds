#!/bin/bash

function css {
	echo -e "/* Automatically Generated Vars */\n\n:root {";

	grep -x '^\s*--.*:.*' *.css | while read x ; do echo -e "\t$x" ; done

	echo "}"
}

function classes {
	ls $1 | while read x ; do
		NAME=$(basename $x .js)
		cat $x | grep -oPw 'class=[{"]\K[^\s}"]+' | sed "s/.*/\.$NAME \.& {\n\t\n}\n/g"
	done
}

FNAME=shift
CMD=shift
[ "$FNAME" = "classes" ] && classes $1 && exit $?
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