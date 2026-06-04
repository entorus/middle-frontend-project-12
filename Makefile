install:
	npm ci
	npm ci --prefix frontend
build:
	rm -rf frontend/dist
	npm run build --prefix frontend

start:
	npx start-server -s ./frontend/dist