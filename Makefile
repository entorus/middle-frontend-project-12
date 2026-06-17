install:
	npm ci
	npm ci --prefix frontend
build:
	rm -rf frontend/dist
	npm run build --prefix frontend

start:
	test -f frontend/dist/index.html || npm run build --prefix frontend
	npx start-server -s ./frontend/dist
