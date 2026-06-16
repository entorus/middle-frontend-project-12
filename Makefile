.PHONY: build install start

build: install
	rm -rf frontend/dist
	npm run build --prefix frontend

install:
	npm ci
	npm ci --prefix frontend

start:
	npx start-server -s ./frontend/dist
