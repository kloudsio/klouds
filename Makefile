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

development:
	bash -c -- "NODE_ENV=development\
		PORT=3000\
		STRIPE_SK=wtfjoke\
		JWT_KEY=abcdefg\
		ASSETS=../dist\
		MONGODB=localhost\
		sane 'make; babel-node server/index.js' {src,server} --glob='**/*'"


test:
	@./scripts/lint-elements.sh
	@$(bin)/mochify --transform babelify --reporter spec ./test/index.js

# clean
clean:
	rm -rf dist

.PHONY: clean
.PHONY: all dir build css js watch serve test handlebars
