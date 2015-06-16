
NODE := iojs
NODE_ENV ?= development



#
# Commands
#
all: install build


install: node_modules dist/lib

# when package.json updates, npm install, update timestamp
node_modules: package.json
	@ npm install
	@ touch node_modules


# when node_modules or package.json updates, then copy vendor libs
dist/lib: node_modules package.json
	@[ -d dist ] || mkdir dist
	@[ -d dist/lib ] || mkdir dist/lib
	@ cp ./node_modules/flexboxgrid/css/index.min.css dist/lib/flexbox.css

#
# client build
#

BROWSERIFY := ./node_modules/.bin/browserify

BABELIFY := babelify
BABELIFY += --jsxPragma element
BABELIFY += --stage 1
BABELIFY += --optional utility.inlineEnvironmentVariables
BABELIFY += --optional es7.asyncFunctions

MYTH := ./node_modules/.bin/myth

PUBLIC := $(wildcard src/public/*)
PUBLIC_TARGET := add_prefix(build/ $(PUBLIC))

build: js css $(PUBLIC)

css:
	$(MYTH) src/styles/app.css dist/app.css

js:
	@echo 'browserifying src/lib/app.js with a sprinkle of ES6 glory'
	@$(BROWSERIFY) src/lib/app.js -t [ $(BABELIFY) ] --outfile dist/app.js
	@echo done.


dist/%: src/public/%
	cp src/public/$* dist/$*


clean:
	rm -rf dist
	rm -rf node_modules
	npm cache clean

.PHONY: all install build clean js css