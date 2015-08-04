export PATH := ./node_modules/.bin:${PATH}
export SHELL := /bin/bash
export NODE_ENV=development
export DEBUG=browserify*

out = ${HOME}/.klouds/bundled
bin = node_modules/.bin
src = $(shell find src -name '*.js')
css = $(shell find src -name '*.css')
elements = $(shell find src/components -name '*.hbs')
test = $(shell find test -name '*.js')

all: dir js css

dir:
	@[ -d "$(out)" ] || mkdir $(out)
	@cp -rv src/public/* $(out)/

js: $(src)
	@./scripts/html-to-deku.sh src/templates/*.html
	@ browserify -d src/app.js -t babelify -o $(out)/app.js -v
	# browserify finished.

css: $(css)
	@$(bin)/myth src/styles/app.css $(out)/app.css
	# myth finished.

test:
	@./scripts/lint-elements.sh
	@$(bin)/mochify --transform babelify --reporter spec ./test/index.js

# clean
clean:
	rm -rf $(out)

.PHONY: all dir css js serve dev test clean
