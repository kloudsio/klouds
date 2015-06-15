
NODE := iojs
NODE_ENV ?= development



#
# Commands
#
all: install


install:
	@[ -d dist ] || mkdir dist
	@[ -d dist/lib ] || mkdir dist/lib
	@ npm install
	@ cp ./node_modules/flexboxgrid/css/index.min.css dist/lib/flexbox.css
	@ cp ./node_modules/normalize.css/normalize.css dist/lib/normalize.css

#
# client build
#

BROWSERIFY := ./node_modules/.bin/browserify
MYTH := ./node_modules/.bin/myth

build: js css public

css:
	$(MYTH) src/styles/app.css dist/app.css

js:
	$(BROWSERIFY) src/lib/app.js -t [ babelify \
				--jsxPragma element \
				--stage 1 \
				--optional utility.inlineEnvironmentVariables \
				--optional es7.asyncFunctions \
			] --outfile dist/app.js

public:
	cp -R src/public/* dist/


clean:
	rm -rf dist
	rm -rf node_modules
	npm cache clean

.PHONY: all install build clean js css