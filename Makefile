export PATH := ./node_modules/.bin:${PATH}
bin = node_modules/.bin
src = $(shell find src -name '*.js')
css = $(shell find src -name '*.css')
elements = $(shell find src/components -name '*.hbs')
test = $(shell find test -name '*.js')


all: dir js css

dir:
	@[ -d "dist" ] || mkdir -p dist
	@cp -rvu src/public/* dist/


js: $(src)
	@browserify -d src/app.js -t babelify -o dist/app.js -v
	# browserify finished.

css: $(css)
	@$(bin)/myth src/styles/app.css dist/app.css
	# myth finished.

serve:
	$(bin)/beefy --cwd dist --open --live 3000 --command make

test:
	@./scripts/lint-elements.sh
	@$(bin)/mochify --transform babelify --reporter spec ./test/index.js

# clean
clean:
	rm -rf dist

.PHONY: clean
.PHONY: all dir build css js watch serve test handlebars
