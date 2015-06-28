export PATH := ./node_modules/.bin:${PATH}

bin = node_modules/.bin
src = $(shell find src -name '*.js')
css = $(shell find src -name '*.css')
test = $(shell find test -name '*.js')


all: install build
.PHONY: all

install: node_modules dist/lib/flexbox.css dist/lib/browser-polyfill.min.js
	# install
.PHONY: install

node_modules: package.json
	# node modules
	@ npm install
	@ touch node_modules


dist/lib/%: node_modules package.json
	# manually copying vendor
	@mkdir -p dist/lib
	@ cp -v ./node_modules/flexboxgrid/css/index.min.css dist/lib/flexbox.css
	@ cp -v ./node_modules/babelify/node_modules/babel-core/browser-polyfill.min.js dist/lib/browser-polyfill.min.js

# build
build: dist/app.js dist/app.css assets
	# build done.
.PHONY: build

# css
dist/app.css: $(css)
	# myth
	@$(bin)/myth src/styles/app.css dist/app.css

# js
dist/app.js: $(src) .babelrc
	# browserify
	@browserify -d src/lib/app.js -t babelify --outfile dist/app.js

# assets
assets:
	@ cp -vu src/public/* dist/
.PHONY: assets

mochify: node_modules $(src) $(test)
	@$(bin)/mochify --transform babelify --reporter spec ./test/index.js
.PHONY: mochify

test: | mochify
.PHONY: test

# clean
clean:
	rm -rf dist
	rm -rf node_modules
	npm cache clean
.PHONY: clean

