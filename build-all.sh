#!/bin/bash

set -e

cd $(dirname $0) # work in our own turf.
OUTPUT_DIR=client-build

print_help()
{
    cat 1>&2 <<EOF
build-all Usage:
    build-all [opts]
    -o - Build Output Directory
    -h - Print this message
EOF
}


##
## some fancy options
##
while getopts ":h:o:e:x:i:" opt;do
    case $opt in
    o)  # speciy the output directory
        OUTPUT_DIR=`realpath ${OPTARG}`
        ;;
    e)  # environment file
		`cat klouds.env | grep = | sed -e "s/^/export /g"`
		;;
	x)  # environment url
		if [ echo $OPTARG | grep -E "^http" ]; then
			curl $OPTARG | source
		fi
		;;
    # i) 
    #     CLIENT_DIR=${OPTARG}
    #     [ -e $CLIENT_DIR ] || (echo "-o must point to ./client/src" >&2; exit 1)
    #     ;;
    \?)
        echo "Invalid arguements" >&2
        print_help
        exit 1
        ;;
    :)
        echo "Option -${OPTARG} requires arguement." >&2
        print_help
        exit 1
        ;;
    esac
echo $opt
done

shift $((OPTIND-1))


mkdir -p $OUTPUT_DIR;
echo "Output Directory: $OUTPUT_DIR"


##
##
## build client
##
cd client

npm install -d --log-level=warn;

./scripts/lint-elements.sh src/components/*

./scripts/deku-wrap.sh

browserify -v -d src/app.js -t babelify -t envify -o $OUTPUT_DIR/app.js
echo "created $OUTPUT_DIR/app.js"

myth src/styles/app.css $OUTPUT_DIR/app.css
echo "created $OUTPUT_DIR/app.css"

echo "copying pages, images, libs n' shit."
cp -vru src/public/* $OUTPUT_DIR/

# mochify --transform babelify --reporter spec ./test/index.js
# echo 'no tests passed, but if there were some.. they might'


##
##
## build server
##