export PATH := ./node_modules/.bin:${PATH}

bin = node_modules/.bin
src = $(shell find src -name '*.js')
css = $(shell find src -name '*.css')
test = $(shell find test -name '*.js')


all: install build
.PHONY: all

install: node_modules dist/lib/flexbox.css dist/lib/browser-polyfill.min.js
.PHONY: install

node_modules: package.json
	@ npm install
	@ touch node_modules


dist/lib/%: node_modules package.json
	@mkdir -p dist/lib
	@ cp -vu ./node_modules/flexboxgrid/css/index.min.css dist/lib/flexbox.css
	@ cp -vu ./node_modules/babelify/node_modules/babel-core/browser-polyfill.min.js dist/lib/browser-polyfill.min.js

build: dist/app.js dist/app.css assets
.PHONY: build

watch:
	@sane "make build" src --glob="**.*"
.PHONY: watch


# assets
assets:
	@ cp -vu src/public/* dist/
.PHONY: assets

# css
dist/app.css: $(css)
	# myth
	@$(bin)/myth src/styles/app.css dist/app.css


# js
dist/app.js: $(src) .babelrc
	# browserify:
	@browserify -d src/app.js -t babelify --outfile dist/app.js


mochify: node_modules $(src) $(test)
	@$(bin)/mochify --transform babelify --reporter spec ./test/index.js
.PHONY: mochify

test: | mochify
.PHONY: test

# clean
clean:
	rm -rf dist
.PHONY: clean

