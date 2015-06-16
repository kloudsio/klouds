
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
	@ echo 'Running npm install'
	@ npm install
	@ touch node_modules


# when node_modules or package.json updates, then copy vendor libs
dist/lib: node_modules package.json
	@echo 'Copying Vendor Dependencies'
	@[ -d dist ] || mkdir dist
	@[ -d dist/lib ] || mkdir dist/lib
	@ cp ./node_modules/flexboxgrid/css/index.min.css dist/lib/flexbox.css

# build
build: dist/app.js dist/app.css assets
.PHONY: build

# css
dist/app.css: src/**/*.css
	@echo 'Starting myth:'
	@$(MYTH) src/styles/app.css dist/app.css

# js
dist/app.js: src/elements/*.js src/lib/*.js
	@echo 'Starting browserify:'
	@$(BROWSERIFY) src/lib/app.js -t [ $(BABELIFY) ] --outfile dist/app.js

# assets
assets:
	@ cp -vu src/public/* dist/

.PHONY: assets

# clean
clean:
	rm -rf dist
	rm -rf node_modules
	npm cache clean
.PHONY: clean

