export PATH := ./node_modules/.bin:${PATH}

bin = node_modules/.bin
output = dist
src = $(shell find src -name '*.js')
elements = $(shell find src/components -name '*.js')
css = $(shell find src -name '*.css')
test = $(shell find test -name '*.js')

default: mkdir npm-install build

mkdir:
	@[ -d "$(output)" ] || mkdir -p $(output)
npm-install: package.json
	@npm install

build: build-css build-js public

public:
	@cp -rvu src/public/* dist/

.PHONY: default build public npm-install

# css
build-css: $(css)
	# running myth...
	@$(bin)/myth src/styles/app.css dist/app.css
	# myth finished.
.PHONY: build-css

# js
build-js: $(src)
	# running browserify...
	@browserify -d src/app.js -t babelify -o dist/app.js -v
	# browserify finished.
.PHONY: build-js

# js
watch: $(src)
	# running watchify...
	@watchify -d src/app.js -t babelify -o dist/app.js -v
	# watchify finished.
.PHONY: watch

test: elements mochify
.PHONY: test

elements:
	./scripts/lint-elements.sh
.PHONY: elements

mochify: $(test)
	@$(bin)/mochify --transform babelify --reporter spec ./test/index.js
.PHONY: mochify

# clean
clean:
	rm -rf dist
.PHONY: clean

