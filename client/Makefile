export PATH := ./node_modules/.bin:${PATH}
export SHELL := /bin/bash
export NODE_ENV=development
export DEBUG=browserify*

bin = node_modules/.bin
src = $(shell find src -name '*.js')
css = $(shell find src -name '*.css')
elements = $(shell find src/components -name '*.hbs')
test = $(shell find test -name '*.js')

all: dir js css

dir:
	@[ -d "dist" ] || mkdir dist
	@cp -rv src/public/* dist/

js: $(src)
	@./scripts/html-to-deku.sh src/templates/*.html
	@ browserify -d src/app.js -t babelify -o dist/app.js -v
	# browserify finished.

css: $(css)
	@$(bin)/myth src/styles/app.css dist/app.css
	# myth finished.

test:
	@./scripts/lint-elements.sh
	@$(bin)/mochify --transform babelify --reporter spec ./test/index.js

# clean
clean:
	rm -rf dist

.PHONY: all dir css js serve dev test clean
