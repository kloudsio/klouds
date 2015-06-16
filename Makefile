
NODE := iojs
NODE_ENV ?= development

BROWSERIFY := ./node_modules/.bin/browserify

BABELIFY := babelify
BABELIFY += --jsxPragma element
BABELIFY += --stage 1
BABELIFY += --optional utility.inlineEnvironmentVariables
BABELIFY += --optional es7.asyncFunctions

MYTH := ./node_modules/.bin/myth


#
# Commands
#
all: install build
.PHONY: all

install: node_modules dist/lib
.PHONY: install

# when package.json updates, npm install, update timestamp
node_modules: package.json
	@ npm install
	@ touch node_modules


# when node_modules or package.json updates, then copy vendor libs
dist/lib: node_modules package.json
	@[ -d dist ] || mkdir dist
	@[ -d dist/lib ] || mkdir dist/lib
	@ cp ./node_modules/flexboxgrid/css/index.min.css dist/lib/flexbox.css

# build
build: js css assets
.PHONY: build

# css
css:
	$(MYTH) src/styles/app.css dist/app.css
.PHONY: css

# js
js:
	@echo 'browserifying src/lib/app.js with a sprinkle of ES6 glory'
	@$(BROWSERIFY) src/lib/app.js -t [ $(BABELIFY) ] --outfile dist/app.js
	@echo done.
.PHONY: js

# assets
assets: src/public
	@ touch src/public
	@ cp src/public/* dist/
.PHONY: assets

# clean
clean:
	rm -rf dist
	rm -rf node_modules
	npm cache clean
.PHONY: clean

