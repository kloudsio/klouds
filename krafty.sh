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

NAME=shift
CMD=shift
[ "$NAME" = "classes" ] && classes $1 && exit $?
[ "$CMD" = "css" ]     && css && exit $?


# PRINT HELP
echo "Klouds Utils"
echo -e "\nUsage:"
echo -e "\t./$(basename $0) COMMAND"
echo -e "\nCommands:"
echo -e "\t classes: print out elements css skeleton from elements/*.js"
echo -e "\t css: print out css customizable vars from styles/*.css"
echo -e "\nExamples:"
echo -e "\t./$(basename $0) classes > rawr.css"
echo -e "\t./$(basename $0) css > rawr.css"